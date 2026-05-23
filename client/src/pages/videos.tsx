import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const videos = [
  { title: "What is Term Life Insurance?", duration: "3:45" },
  { title: "How Much Coverage Do You Need?", duration: "5:20" },
  { title: "Understanding Your Policy", duration: "4:15" },
];

export default function Videos() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Videos</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Quick explainers to help you understand coverage, costs, and next steps.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Card key={video.title} className="p-6 border-0 shadow-sm">
                <div className="bg-slate-200 h-40 rounded-lg mb-4 flex items-center justify-center text-slate-500">
                  {video.duration}
                </div>
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <a href="/resources#videos" className="text-blue-600 font-semibold">
                  Watch on Resources →
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
