import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createQuoteRequest,
  createContactSubmission,
  getQuoteRequests,
  getContactSubmissions,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { analyzeLeadWithHermes } from "./_core/hermes";

async function notifyOwnerWithFallback(
  payload: Parameters<typeof notifyOwner>[0],
  label: string
): Promise<boolean> {
  try {
    const delivered = await notifyOwner(payload);

    if (!delivered) {
      console.warn(`[Leads] Owner notification delivery failed for ${label}.`);
    }

    return delivered;
  } catch (error) {
    console.error(`[Leads] Owner notification error for ${label}:`, error);
    return false;
  }
}

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    listCRM: adminProcedure.query(async () => {
      const [quotes, contacts] = await Promise.all([
        getQuoteRequests(),
        getContactSubmissions(),
      ]);

      const quoteItems = quotes.map((item: any) => ({
        id: `quote_${item.id ?? item.createdAt ?? Date.now()}`,
        type: "quote" as const,
        name: item.name,
        phone: item.phone,
        email: item.email,
        details: item.coverageType || item.message || "",
        source: "quote form",
        createdAt: item.createdAt,
      }));

      const contactItems = contacts.map((item: any) => ({
        id: `contact_${item.id ?? item.createdAt ?? Date.now()}`,
        type: "contact" as const,
        name: item.name,
        phone: item.phone,
        email: item.email,
        details: item.subject || item.message || "",
        source: "contact form",
        createdAt: item.createdAt,
      }));

      return [...quoteItems, ...contactItems].sort(
        (a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime()
      );
    }),

    submitQuote: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name is required"),
          phone: z.string().min(10, "Valid phone number is required"),
          email: z.string().email("Valid email is required"),
          state: z.string().length(2, "State is required"),
          coverageType: z.string().min(1, "Coverage type is required"),
          preferredContact: z.string().min(1, "Preferred contact method is required"),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lead_id = `quote_${Date.now()}`;
        await createQuoteRequest(input);

        const hermes = await analyzeLeadWithHermes({
          lead_id,
          pipeline: "client",
          channel: "web_form",
          name: input.name,
          phone: input.phone,
          email: input.email,
          source: "website",
          notes: input.coverageType,
          context: {
            goal: "book_qualified_appointment",
            product: input.coverageType,
          },
        });

        // Notify owner of new quote request
        await notifyOwnerWithFallback({
          title: "New Quote Request",
          content: [
            `Lead ID: ${lead_id}`,
            `New quote request from ${input.name}`,
            ``,
            `Phone: ${input.phone}`,
            `Email: ${input.email}`,
            `State: ${input.state}`,
            `Coverage Type: ${input.coverageType}`,
            `Preferred Contact: ${input.preferredContact}`,
            hermes?.classification ? `\nHermes classification: ${hermes.classification}` : "",
            hermes?.next_action ? `Hermes next action: ${hermes.next_action}` : "",
            hermes?.message_text ? `\nHermes message suggestion:\n${hermes.message_text}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }, `quote request ${lead_id}`);

        return { success: true };
      }),

    submitContact: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name is required"),
          phone: z.string().min(10, "Valid phone number is required"),
          email: z.string().email("Valid email is required"),
          subject: z.string().min(5, "Subject is required"),
          message: z.string().min(10, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        const lead_id = `contact_${Date.now()}`;
        await createContactSubmission(input);

        const hermes = await analyzeLeadWithHermes({
          lead_id,
          pipeline: "client",
          channel: "web_form",
          name: input.name,
          phone: input.phone,
          email: input.email,
          source: "website",
          notes: input.subject,
          context: {
            goal: "book_qualified_appointment",
            product: "family_protection",
          },
        });

        // Notify owner of new contact submission
        await notifyOwnerWithFallback({
          title: "New Contact Form Submission",
          content: [
            `Lead ID: ${lead_id}`,
            `New contact submission from ${input.name}`,
            ``,
            `Phone: ${input.phone}`,
            `Email: ${input.email}`,
            `Subject: ${input.subject}`,
            `Message: ${input.message}`,
            hermes?.classification ? `\nHermes classification: ${hermes.classification}` : "",
            hermes?.next_action ? `Hermes next action: ${hermes.next_action}` : "",
            hermes?.message_text ? `\nHermes message suggestion:\n${hermes.message_text}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }, `contact submission ${lead_id}`);

        return { success: true };
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
