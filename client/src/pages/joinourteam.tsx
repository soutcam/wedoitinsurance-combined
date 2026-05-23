import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function JoinOurTeam() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Build a career helping middle class families, millennials, nurses, doctors, transporters, and dependents protect their future.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card className="p-6 border-0 shadow-sm">
              <h2 className="text-2xl font-bold mb-3">What we value</h2>
              <ul className="space-y-2 text-slate-600">
                <li>• Integrity and follow-through</li>
                <li>• Simple, client-first communication</li>
                <li>• Desire to learn and improve</li>
                <li>• Comfort explaining insurance clearly</li>
                <li>• Respect for the families we serve</li>
              </ul>
            </Card>

            <Card className="p-6 border-0 shadow-sm">
              <h2 className="text-2xl font-bold mb-3">Open roles</h2>
              <ul className="space-y-2 text-slate-600">
                <li>• Licensed Life Insurance Advisor</li>
                <li>• Appointment Setter</li>
                <li>• Client Support Specialist</li>
                <li>• Content / Education Assistant</li>
                <li>• Recruiting partner for new agents</li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Interested?</h2>
            <p className="text-slate-600 mb-6">
              Reach out through the contact page and tell us what role you're interested in — especially if you want to help people and build a real insurance business.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </Card>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-slate-300">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
