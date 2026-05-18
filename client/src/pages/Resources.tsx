import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, Headphones, Play } from "lucide-react";

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Resources & Education</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Learn about life insurance, financial planning, and protecting your family's future through our blog, podcast, and video library.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">Blog</h2>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl">
              Expert insights on life insurance, financial planning, and family protection strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Understanding Term Life Insurance",
                excerpt: "Learn how term life insurance works and why it's the most affordable option for most families.",
                date: "May 10, 2026",
              },
              {
                title: "5 Life Events That Require a Policy Review",
                excerpt: "Marriage, children, home purchase, promotion, and retirement. Here's why each requires a policy review.",
                date: "May 5, 2026",
              },
              {
                title: "How Much Life Insurance Do You Really Need?",
                excerpt: "A practical guide to calculating the right coverage amount for your family's needs.",
                date: "April 28, 2026",
              },
              {
                title: "Whole Life vs. Term Life: Which Is Right for You?",
                excerpt: "Compare permanent and temporary coverage options to find the best fit for your situation.",
                date: "April 20, 2026",
              },
              {
                title: "The Importance of Beneficiary Designations",
                excerpt: "Ensure your coverage goes to the right people by understanding beneficiary rules.",
                date: "April 15, 2026",
              },
              {
                title: "Final Expense Insurance: Planning Ahead",
                excerpt: "Protect your family from unexpected funeral and burial costs with final expense coverage.",
                date: "April 8, 2026",
              },
            ].map((post, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-slate-600 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{post.date}</span>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Read More →
                  </a>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="#">View All Articles</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">Podcast</h2>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl">
              Listen to conversations with financial advisors, insurance experts, and families sharing their stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Episode 12: Life Insurance for Entrepreneurs",
                guest: "with Sarah Chen, Business Insurance Specialist",
                description: "Discover how business owners can protect their ventures and families with strategic insurance planning.",
              },
              {
                title: "Episode 11: Planning for Your Children's Future",
                guest: "with Michael Rodriguez, Financial Planner",
                description: "Explore education savings, financial security, and legacy planning for your children.",
              },
              {
                title: "Episode 10: Common Life Insurance Mistakes",
                guest: "with Jennifer Lee, Insurance Advisor",
                description: "Learn the top mistakes people make when buying life insurance and how to avoid them.",
              },
              {
                title: "Episode 9: Protecting Your Mortgage",
                guest: "with David Thompson, Mortgage Protection Expert",
                description: "Understand why mortgage protection insurance is essential for homeowners.",
              },
            ].map((episode, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{episode.title}</h3>
                    <p className="text-sm text-slate-600">{episode.guest}</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{episode.description}</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Listen Now →
                </a>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="#">View All Episodes</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Play className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">Videos</h2>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl">
              Watch short educational videos explaining insurance concepts and helping you make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "What is Term Life Insurance?",
                duration: "3:45",
                description: "A quick overview of how term life insurance works and why it's affordable.",
              },
              {
                title: "How Much Coverage Do You Need?",
                duration: "5:20",
                description: "Learn the simple formula to calculate your ideal coverage amount.",
              },
              {
                title: "Understanding Your Policy",
                duration: "4:15",
                description: "Breakdown of policy terms, conditions, and what your coverage includes.",
              },
              {
                title: "The Quote Process Explained",
                duration: "3:30",
                description: "See how we help you compare quotes and find the best rates.",
              },
              {
                title: "Life Changes & Your Policy",
                duration: "4:50",
                description: "When and why you should review your insurance coverage.",
              },
              {
                title: "Protecting Your Family's Future",
                duration: "6:10",
                description: "A comprehensive guide to financial protection and peace of mind.",
              },
            ].map((video, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="bg-slate-200 h-40 rounded-lg flex items-center justify-center mb-4 relative group">
                  <Play className="w-12 h-12 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <p className="text-slate-600 text-sm">{video.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="#">View All Videos</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Life Insurance Types (Quick Guide) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Life Insurance Types — Quick Guide</h2>
              <p className="text-xl text-slate-600">
                Different policies protect in different ways. Here’s a simple overview we use when helping clients compare options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Term Life</h3>
                <p className="text-slate-700">
                  Coverage for a specific period (often 10–30 years). Typically the most affordable way to get a lot of coverage.
                </p>
              </Card>

              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Whole Life</h3>
                <p className="text-slate-700">
                  Permanent coverage that can last for life, with potential cash value growth (policy details vary by carrier).
                </p>
              </Card>

              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Indexed Universal Life (IUL)</h3>
                <p className="text-slate-700">
                  Permanent coverage with performance tied to an index, designed with downside protection (rules vary by contract).
                </p>
              </Card>

              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Final Expense</h3>
                <p className="text-slate-700">
                  Designed to help cover burial, funeral, and related costs—often with simpler underwriting than traditional life policies.
                </p>
              </Card>

              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Mortgage Protection</h3>
                <p className="text-slate-700">
                  Helps protect your family’s ability to keep the home by covering mortgage payments if something happens to you.
                </p>
              </Card>

              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Business & Key Person</h3>
                <p className="text-slate-700">
                  Helps protect businesses and key people—often connected to continuity and funding planning.
                </p>
              </Card>
            </div>

            <Card className="p-8 border-0 shadow-sm bg-blue-50">
              <h3 className="text-xl font-bold mb-3">Age & Eligibility Note</h3>
              <p className="text-slate-700">
                Availability and pricing depend on the carrier, your health, and underwriting requirements. Some carriers offer options for many ages,
                but age limits and benefits vary by product and state.
              </p>
              <p className="text-slate-700 mt-3">
                Because we’re an <span className="font-semibold">independent broker</span> with multi-carrier access, we can compare options that fit your situation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Use what you've learned to get a free quote and speak with a licensed advisor.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-semibold"
            asChild
          >
            <Link href="/">Get My Free Life Insurance Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
