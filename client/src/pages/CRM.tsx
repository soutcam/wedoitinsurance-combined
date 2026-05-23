import { useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Mail, Phone, Users, CalendarDays, Inbox } from "lucide-react";

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "-";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
}

export default function CRM() {
  const { user, loading } = useAuth();
  const crmQuery = trpc.leads.listCRM.useQuery(undefined, { retry: false });

  const stats = useMemo(() => {
    const rows = crmQuery.data ?? [];
    return {
      total: rows.length,
      quotes: rows.filter(row => row.type === "quote").length,
      contacts: rows.filter(row => row.type === "contact").length,
    };
  }, [crmQuery.data]);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center text-slate-500">Loading CRM…</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl">
        <Card className="p-8 text-center border-0 shadow-sm">
          <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Back office access only</h1>
          <p className="text-slate-600">
            This CRM is only available to admin users.
          </p>
        </Card>
      </div>
    );
  }

  const rows = crmQuery.data ?? [];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Back office</p>
            <h1 className="text-4xl font-bold">CRM</h1>
            <p className="text-slate-600 mt-2">
              Names, emails, and phone numbers from quotes and contact forms.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/contact">Open Public Contact Page</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3"><Inbox className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-sm text-slate-500">Total leads</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-3"><Users className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <p className="text-sm text-slate-500">Quote leads</p>
                <p className="text-3xl font-bold">{stats.quotes}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-3"><Mail className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-sm text-slate-500">Contact leads</p>
                <p className="text-3xl font-bold">{stats.contacts}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="p-5 border-b bg-white flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Lead inbox</h2>
              <p className="text-sm text-slate-500">All captured names, phones, and emails in one place.</p>
            </div>
            <Badge variant="secondary">{rows.length} records</Badge>
          </div>

          {crmQuery.isLoading ? (
            <div className="p-8 text-center text-slate-500">Loading records…</div>
          ) : rows.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No leads yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name || "-"}</TableCell>
                      <TableCell>
                        <a className="text-blue-600 hover:underline" href={`tel:${row.phone}`}>{row.phone || "-"}</a>
                      </TableCell>
                      <TableCell>
                        <a className="text-blue-600 hover:underline" href={`mailto:${row.email}`}>{row.email || "-"}</a>
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.type === "quote" ? "default" : "secondary"}>
                          {row.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[320px] truncate">{row.details || "-"}</TableCell>
                      <TableCell>{formatDate(row.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        <div className="text-sm text-slate-500 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          Use this page as the back office CRM for lead follow-up.
        </div>
      </div>
    </div>
  );
}
