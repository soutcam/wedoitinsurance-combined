import { useMemo } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { CalendarDays, LogIn, ShieldCheck, Clock3, Phone, Mail, UserRound, Sparkles, Database, Users } from "lucide-react";

const DEMO_APPOINTMENTS = [
  {
    id: "demo-1",
    clientName: "Maria Johnson",
    phone: "(555) 014-2024",
    email: "maria@example.com",
    status: "Pending",
    source: "Demo appointment",
    notes: "Mortgage protection follow-up",
    requestedAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    clientName: "James Carter",
    phone: "(555) 014-3011",
    email: "james@example.com",
    status: "Pending",
    source: "Demo appointment",
    notes: "Final expense review",
    requestedAt: new Date().toISOString(),
  },
];

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "-";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
}

export default function AgentPortal() {
  const { user, loading } = useAuth();
  const [location] = useLocation();
  const demoMode = useMemo(() => new URLSearchParams(location.split("?")[1] ?? "").get("demo") === "1", [location]);
  const appointmentQuery = trpc.leads.pendingAppointments.useQuery(undefined, {
    retry: false,
    enabled: Boolean(user),
  });

  const appointments = user ? (appointmentQuery.data ?? []) : demoMode ? DEMO_APPOINTMENTS : [];
  const isAdmin = user?.role === "admin";
  const totalPending = appointments.length;
  const urgentCount = appointments.filter((item: any) => /urgent|today|asap/i.test(String(item.notes ?? ""))).length;

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center text-slate-500">Loading agent portal…</div>;
  }

  if (!user && !demoMode) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 md:p-10 border-0 shadow-sm text-center">
            <LogIn className="w-14 h-14 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-3">Agent Portal</h1>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Log in to see pending appointments, lead follow-up, and private agent tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  window.location.href = getLoginUrl();
                }}
              >
                Sign in to Agent Portal
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/agent-portal?demo=1">Open demo view</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Private area</p>
            <h1 className="text-4xl font-bold">Agent Portal</h1>
            <p className="text-slate-600 mt-2">
              Pending appointments, follow-up status, and private tools for approved agents.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {demoMode && !user ? <Badge className="w-fit" variant="secondary">Demo access</Badge> : null}
            {user ? <Badge className="w-fit" variant="secondary">Signed in</Badge> : null}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3"><CalendarDays className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-sm text-slate-500">Pending appointments</p>
                <p className="text-3xl font-bold">{totalPending}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-3"><Clock3 className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-sm text-slate-500">Urgent follow-ups</p>
                <p className="text-3xl font-bold">{urgentCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-3"><UserRound className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <p className="text-sm text-slate-500">Agent role</p>
                <p className="text-3xl font-bold">{user?.role || "guest"}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="p-5 border-b bg-white flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Pending appointments</h2>
              <p className="text-sm text-slate-500">Follow up on requested calls and book the next step.</p>
            </div>
            <Badge variant="outline">{appointments.length} records</Badge>
          </div>

          {user && appointmentQuery.isLoading ? (
            <div className="p-8 text-center text-slate-500">Loading appointments…</div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No pending appointments yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Requested</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.clientName || "-"}</TableCell>
                      <TableCell>
                        <a className="text-blue-600 hover:underline" href={`tel:${row.phone}`}>{row.phone || "-"}</a>
                      </TableCell>
                      <TableCell>
                        <a className="text-blue-600 hover:underline" href={`mailto:${row.email}`}>{row.email || "-"}</a>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{row.status || "Pending"}</Badge>
                      </TableCell>
                      <TableCell>{row.source || "-"}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{row.notes || "-"}</TableCell>
                      <TableCell>{formatDate(row.requestedAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-6 border-0 shadow-sm bg-blue-50">
            <div className="flex items-start gap-3">
              <Database className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Admin tools</h2>
                <p className="text-slate-700 text-sm">
                  Approved admins can also open the CRM for full lead inbox access.
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

          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold mb-1">How to use this portal</h2>
                <p className="text-slate-700 text-sm">
                  Login, review the pending appointments queue, and follow up quickly so every lead gets a real conversation.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Sparkles className="w-4 h-4" />
              {isAdmin ? "Admin access includes CRM data." : "Agent access shows appointments only."}
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <Mail className="w-4 h-4" />
              <Phone className="w-4 h-4" />
              Keep contact info current so follow-up is fast.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
