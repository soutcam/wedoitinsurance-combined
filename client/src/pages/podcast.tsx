import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const episodes = [
  {
    title: "Life Insurance for Entrepreneurs",
    guest: "with Sarah Chen",
    description: "How owners can protect family income and business continuity.",
  },
  {
    title: "Planning for Your Children's Future",
    guest: "with Michael Rodriguez",
    description: "Education, savings, and legacy planning made simple.",
  },
  {
    title: "Common Life Insurance Mistakes",
    guest: "with Jennifer Lee",
    description: "Avoid the traps that leave families underprotected.",
  },
];

export default function Podcast() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Podcast</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Conversations with advisors and families about protecting what matters most.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {episodes.map((episode) => (
              <Card key={episode.title} className="p-6 border-0 shadow-sm">
                <h2 className="text-xl font-semibold mb-1">{episode.title}</h2>
                <p className="text-sm text-slate-500 mb-3">{episode.guest}</p>
                <p className="text-slate-600 mb-4">{episode.description}</p>
                <a href="/resources#podcast" className="text-blue-600 font-semibold">
                  Listen on Resources →
                </a>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/resources">Back to Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
