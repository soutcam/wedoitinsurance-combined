import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification functions
vi.mock("./db", () => ({
  createQuoteRequest: vi.fn().mockResolvedValue({ success: true }),
  createContactSubmission: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("leads router", () => {
  describe("submitQuote", () => {
    it("accepts valid quote request data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.leads.submitQuote({
        name: "John Doe",
        phone: "(555) 123-4567",
        email: "john@example.com",
        state: "NM",
        coverageType: "Term Life",
        preferredContact: "email",
      });

      expect(result).toEqual({ success: true });
    });

    it("rejects invalid phone number", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.leads.submitQuote({
          name: "John Doe",
          phone: "123",
          email: "john@example.com",
          state: "NM",
          coverageType: "Term Life",
          preferredContact: "email",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("phone");
      }
    });

    it("rejects invalid email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.leads.submitQuote({
          name: "John Doe",
          phone: "(555) 123-4567",
          email: "invalid-email",
          state: "NM",
          coverageType: "Term Life",
          preferredContact: "email",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("email");
      }
    });

    it("rejects invalid state code", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.leads.submitQuote({
          name: "John Doe",
          phone: "(555) 123-4567",
          email: "john@example.com",
          state: "NEW",
          coverageType: "Term Life",
          preferredContact: "email",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("state");
      }
    });
  });

  describe("submitContact", () => {
    it("accepts valid contact form data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.leads.submitContact({
        name: "Jane Smith",
        phone: "(555) 987-6543",
        email: "jane@example.com",
        subject: "Policy Review Request",
        message: "I would like to review my current life insurance policy.",
      });

      expect(result).toEqual({ success: true });
    });

    it("rejects short message", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.leads.submitContact({
          name: "Jane Smith",
          phone: "(555) 987-6543",
          email: "jane@example.com",
          subject: "Policy Review",
          message: "Help",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("message");
      }
    });

    it("rejects short subject", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.leads.submitContact({
          name: "Jane Smith",
          phone: "(555) 987-6543",
          email: "jane@example.com",
          subject: "Hi",
          message: "I would like to review my current life insurance policy.",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("subject");
      }
    });
  });
});
