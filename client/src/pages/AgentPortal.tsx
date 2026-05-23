import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, FileText, MessageCircle, LogIn, Database, Sparkles } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function AgentPortal() {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin";
  const crmQuery = trpc.leads.listCRM.useQuery(undefined, {
    retry: false,
    enabled: Boolean(user && isAdmin),
  });

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center text-slate-500">Loading agent portal…</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 md:p-10 border-0 shadow-sm text-center">
            <LogIn className="w-14 h-14 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-3">Agent Portal</h1>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Log in to see private training, lead information, CRM tools, and business resources.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              Sign in to Agent Portal
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Private area</p>
            <h1 className="text-4xl font-bold">Agent Portal</h1>
            <p className="text-slate-600 mt-2">
              Training, lead visibility, scripts, and tools for approved agents.
            </p>
          </div>
          <Badge className="w-fit" variant="secondary">Signed in</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, title: "Training", text: "Sales scripts, product basics, and next-step guidance." },
            { icon: Users, title: "Leads", text: "See names, phone numbers, and emails captured by the site." },
            { icon: FileText, title: "Resources", text: "Downloadable docs, talking points, and presentations." },
            { icon: MessageCircle, title: "Support", text: "Agent help, follow-up notes, and team communication." },
          ].map(item => (
            <Card key={item.title} className="p-6 border-0 shadow-sm">
              <item.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-slate-600 text-sm">{item.text}</p>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="p-5 border-b bg-white flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Lead access</h2>
              <p className="text-sm text-slate-500">Private CRM snapshot for approved admin agents.</p>
            </div>
            <Badge variant="outline">{crmQuery.data?.length ?? 0} records</Badge>
          </div>
          {isAdmin && crmQuery.isLoading ? (
            <div className="p-8 text-center text-slate-500">Loading lead access…</div>
          ) : !isAdmin ? (
            <div className="p-8 text-slate-600">
              Lead records are reserved for admin access. Regular agents can still use training, scripts, and support tools here.
            </div>
          ) : (
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-5 border-0 bg-slate-50">
                <p className="text-sm text-slate-500">Name</p>
                <p className="text-lg font-semibold">{user.name || "Agent"}</p>
              </Card>
              <Card className="p-5 border-0 bg-slate-50">
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-lg font-semibold">{user.email || "-"}</p>
              </Card>
              <Card className="p-5 border-0 bg-slate-50">
                <p className="text-sm text-slate-500">Role</p>
                <p className="text-lg font-semibold">{user.role || "user"}</p>
              </Card>
            </div>
          )}
        </Card>

        <Card className="p-6 border-0 shadow-sm bg-blue-50">
          <div className="flex items-start gap-3">
            <Database className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h2 className="text-lg font-semibold mb-1">More information access</h2>
              <p className="text-slate-700 text-sm">
                This portal is the place for approved agents to see more than the public website: training, lead data, scripts, and back-office tools.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/crm">Open CRM</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/join-our-team">Agent recruiting</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact">Request access help</a>
            </Button>
          </div>
        </Card>

        <div className="text-sm text-slate-500 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Add more private tools here as the back office grows.
        </div>
      </div>
    </div>
  );
}
