import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

export default function Hethaverse() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">HETHAVERSE — Drug Interaction Checker</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Use this tool to see a starter set of interaction warnings. For medical decisions, always consult a clinician or pharmacist.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <a
                href="https://hethaverse.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in new tab <ExternalLink className="ml-2" />
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Talk to an advisor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <Card className="p-4 md:p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold">Embedded tool</h2>
                <p className="text-slate-600">If the tool doesn’t load, open the full version in a new tab.</p>
              </div>
            </div>

            <div className="w-full" style={{ height: "75vh" }}>
              <iframe
                title="HETHAVERSE tool"
                src="https://hethaverse.vercel.app/"
                style={{ width: "100%", height: "100%", border: 0, borderRadius: 12 }}
              />
            </div>
          </Card>

          <div className="mt-6 text-sm text-slate-500">Educational only. Not medical advice.</div>
        </div>
      </section>
    </div>
  );
}
