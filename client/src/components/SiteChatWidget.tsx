import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { MessageSquareMore, Sparkles, X } from "lucide-react";

export default function SiteChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m the WEDOIT assistant. I can help with coverage questions, booking, agent onboarding, or point you to the right page.",
    },
  ]);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I’m having trouble connecting right now, but I can still help point you to the right page or contact form.",
        },
      ]);
    },
  });

  const handleSend = (content: string) => {
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    chatMutation.mutate({ messages: nextMessages });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      {open ? (
        <Card className="pointer-events-auto w-[min(92vw,420px)] overflow-hidden border border-slate-200 shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b bg-slate-900 px-4 py-3 text-white">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-blue-300" />
                WEDOIT Assistant
              </div>
              <p className="text-xs text-slate-300">Ask about coverage, bookings, or getting started.</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <AIChatBox
            messages={messages}
            onSendMessage={handleSend}
            isLoading={chatMutation.isPending}
            placeholder="Ask about quotes, appointments, or agent training..."
            height="520px"
            emptyStateMessage="Start a conversation with the WEDOIT assistant"
            suggestedPrompts={[
              "How do I book a call?",
              "What coverage should I consider?",
              "How do I join the team?",
            ]}
          />
        </Card>
      ) : null}

      <Button
        onClick={() => setOpen((value) => !value)}
        className="pointer-events-auto ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-xl hover:bg-blue-700"
        size="icon"
      >
        <MessageSquareMore className="h-6 w-6" />
      </Button>
    </div>
  );
}
