import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const posts = [
  {
    title: "Understanding Term Life Insurance",
    excerpt: "A practical guide to how term coverage works and when it makes sense.",
    date: "May 10, 2026",
  },
  {
    title: "How Much Coverage Do You Really Need?",
    excerpt: "Learn a simple needs-based approach for families, homeowners, and business owners.",
    date: "May 5, 2026",
  },
  {
    title: "Five Life Events That Call for a Policy Review",
    excerpt: "Marriage, children, home purchases, new income, and retirement all change your needs.",
    date: "April 28, 2026",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Straightforward education on life insurance, family protection, and financial planning.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.title} className="p-6 border-0 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-slate-600 mb-4">{post.excerpt}</p>
                <a href="/resources#blog" className="text-blue-600 font-semibold">
                  Read on Resources →
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
