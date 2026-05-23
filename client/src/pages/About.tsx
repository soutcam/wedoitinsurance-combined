import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Shield, Users, HeartHandshake, BadgeCheck, Briefcase, MapPin, PhoneCall, Star } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Independent guidance",
    text: "We compare options across carriers so you can make a decision with context, not pressure.",
  },
  {
    icon: HeartHandshake,
    title: "Family first",
    text: "Every recommendation starts with the people depending on you, your budget, and your goals.",
  },
  {
    icon: BadgeCheck,
    title: "Clear explanations",
    text: "We keep the jargon out of it and explain coverage in plain English.",
  },
  {
    icon: Briefcase,
    title: "Built for growth",
    text: "We also train new agents who want to build a real business helping people protect what matters.",
  },
];

const services = [
  "Term life insurance",
  "Final expense planning",
  "Living benefits",
  "Mortgage protection",
  "Tax-advantaged strategies",
  "Agent training and support",
];

const whyStarted = [
  "People deserve straightforward coverage guidance.",
  "Families need a process that feels human, not pushy.",
  "Agents need better training and back-office support.",
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div className="text-center lg:text-left">
              <p className="text-blue-300 font-semibold tracking-wide uppercase mb-4">About WEDOIT Insurance</p>
              <h1 className="text-5xl font-bold mb-6 leading-tight">Built to help families, not confuse them.</h1>
              <p className="text-xl text-slate-200 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                WEDOIT Insurance is an independent life insurance brokerage focused on helping families, working professionals,
                and future agents get clear guidance, straightforward options, and a no-pressure experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start text-sm text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><MapPin className="w-4 h-4" /> Serving all 50 states</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><PhoneCall className="w-4 h-4" /> (575) 266-3119</span>
              </div>
            </div>

            <Card className="overflow-hidden border-0 shadow-2xl bg-white/10 text-white backdrop-blur">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80"
                  alt="Family planning insurance together"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Families first</p>
                  <p className="mt-1 text-sm text-slate-100 max-w-md">
                    Generic photo used until your own founder image is ready.
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-blue-200 mb-2">Founder</p>
                  <h2 className="text-2xl font-bold">Joel — building WEDOIT around real conversations</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-slate-300">Focus</p>
                    <p className="font-semibold">Families + agents</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-slate-300">Style</p>
                    <p className="font-semibold">Clear, honest, no-pressure</p>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_1fr] gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"
                    alt="Business meeting and handshake"
                    className="h-28 w-full rounded-xl object-cover border border-white/10"
                  />
                  <div className="rounded-xl bg-white/10 p-4 flex flex-col justify-center border border-white/10">
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Trust</p>
                    <p className="mt-2 text-sm text-slate-100">Warm, human, and built for real families.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">Founder story</p>
              <h2 className="text-4xl font-bold mb-6">Why I started WEDOIT Insurance</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>
                  WEDOIT Insurance grew out of a simple idea: people should not have to fight through confusing sales talk just to protect their family.
                  If someone needs life insurance, mortgage protection, final expense coverage, or a plan that gives them living benefits, they deserve a clear answer.
                </p>
                <p>
                  I wanted a business that felt honest, useful, and easy to understand. So WEDOIT was built to compare options, explain them clearly,
                  and help people choose coverage that actually fits their life and budget.
                </p>
                <p>
                  We also support the next generation of agents with training, scripts, and back-office tools so they can learn the business and serve people well.
                </p>
              </div>
            </div>

            <Card className="p-8 border-0 shadow-sm bg-slate-50">
              <h3 className="text-2xl font-bold mb-4">What we do</h3>
              <p className="text-slate-700 mb-6">
                We help clients find protection that works for real life — whether that means term coverage, final expense planning,
                mortgage protection, or a more strategic approach for long-term family security.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((item) => (
                  <div key={item} className="rounded-lg bg-white p-4 border border-slate-200 text-slate-700 font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">How we work</p>
              <h2 className="text-4xl font-bold">The way we do business</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {principles.map((item) => (
                <Card key={item.title} className="p-6 border-0 shadow-sm bg-white">
                  <item.icon className="w-11 h-11 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: "Independent", label: "Broker, not an insurance company" },
              { stat: "50 states", label: "Service area across the U.S." },
              { stat: "No pressure", label: "Education first, decision second" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">{item.stat}</div>
                <p className="text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {whyStarted.map((item) => (
              <Card key={item} className="p-6 border-0 bg-white/5 backdrop-blur text-white shadow-none">
                <h3 className="text-xl font-semibold mb-2">Why this matters</h3>
                <p className="text-slate-200">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-900 text-white border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Need help figuring out the next step?</h2>
            <p className="text-xl text-slate-200 mb-8">
              Call, book a conversation, or send a message — we’ll help you sort through the options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                <a href="tel:+15752663119">Call (575) 266-3119</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact WEDOIT Insurance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
