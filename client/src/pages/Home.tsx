import { lazy, Suspense, useState } from "react";
import { Link } from "wouter";
import { Award, BadgeCheck, Briefcase, Facebook, HeartHandshake, Instagram, Linkedin, Shield, Stethoscope, Truck, Users, UserRound, Youtube, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RevealOnScroll from "@/components/RevealOnScroll";
import LifeInsuranceCalculator from "@/components/LifeInsuranceCalculator";

const QuoteFormContent = lazy(() => import("@/components/QuoteFormContent"));
const QuoteFormModal = lazy(() => import("@/components/QuoteFormModal"));

const audienceCards = [
  {
    icon: UserRound,
    title: "Middle class families",
    text: "Protect the income, mortgage, and everyday stability your household depends on.",
  },
  {
    icon: HeartHandshake,
    title: "Millennials",
    text: "Build protection early while you’re growing a career, family, and long-term wealth.",
  },
  {
    icon: Stethoscope,
    title: "Nurses and doctors",
    text: "Safeguard your income and give your family the same level of planning you give your patients.",
  },
  {
    icon: Truck,
    title: "Transporters",
    text: "Keep home protected when your work keeps you on the road and away from family.",
  },
  {
    icon: Users,
    title: "Anyone with dependents",
    text: "If someone relies on you, a plan matters. Love should be backed by protection.",
  },
  {
    icon: Briefcase,
    title: "Future agents",
    text: "If you want to build income by helping families, we’re looking for coachable people to join the industry.",
  },
];

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/", note: "Business updates and credibility." },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/", note: "Community, families, and referrals." },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/", note: "Short posts, stories, and reels." },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/", note: "Education and explainers." },
  { name: "X", icon: X, href: "https://x.com/", note: "Quick thoughts and updates." },
];

export default function Home() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-blue-300 font-semibold tracking-wide uppercase mb-4">WEDOIT Insurance</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Protect the people who depend on you.
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              We help middle class families, millennials, nurses, doctors, transporters, and future agents find the right life insurance plan with clear guidance and no pressure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all hover:shadow-lg"
                onClick={() => setShowQuoteForm(true)}
              >
                Check My Coverage Options
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg"
                asChild
              >
                <a href="https://calendly.com/wedoit2024/60min" target="_blank" rel="noopener noreferrer">
                  Schedule a Call
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-700">
              {[
                { icon: Shield, label: "Independent Broker" },
                { icon: BadgeCheck, label: "Licensed Advisors" },
                { icon: Award, label: "Multi-Carrier Access" },
                { icon: Users, label: "Family-First Guidance" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <item.icon className="w-6 h-6 text-blue-400" />
                  <span className="text-sm text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Who we help</h2>
            <p className="text-xl text-slate-600">
              Different people need different protection. We build around real life, real responsibilities, and real budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audienceCards.map((card, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <card.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-slate-600">{card.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="quote-form" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">Get your quote right here</h2>
              <p className="text-xl text-slate-600 mb-8">
                Share a few details and we’ll compare options from multiple carriers. If you’d rather talk it through, schedule a call.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Independent broker guidance",
                  "Multi-carrier comparison",
                  "No-pressure follow-up",
                  "Quick, simple next steps",
                ].map((item) => (
                  <Card key={item} className="p-4 border-0 shadow-sm">
                    <p className="font-medium text-slate-800">{item}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-sm text-slate-500">
                Prefer a live conversation? Use the schedule button above.
              </div>
            </div>

            <Card className="p-6 md:p-8 border-0 shadow-sm">
              <RevealOnScroll fallback={<div className="text-slate-500">Scroll to load the quote form…</div>}>
                <Suspense fallback={<div className="text-slate-500">Loading quote form…</div>}>
                  <QuoteFormContent compact />
                </Suspense>
              </RevealOnScroll>
            </Card>
          </div>
        </div>
      </section>

      <LifeInsuranceCalculator />

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Thinking about joining the industry?</h2>
            <p className="text-xl text-slate-600">
              We’re building a team of coachable people who want to help families and create income with purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Learn the business", desc: "Get clear training on how to talk about protection, needs, and next steps." },
              { title: "Serve real people", desc: "Help families who have kids, mortgages, and financial responsibilities." },
              { title: "Build income", desc: "Grow a business by bringing value, consistency, and care to every conversation." },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/join-our-team">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Link your social media accounts</h2>
            <p className="text-xl text-slate-600">
              Connect your business profiles in one place. When a platform supports OAuth, you can link the account; otherwise this gives you a clean launch point.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {socialLinks.map((item) => (
              <Card key={item.name} className="p-6 border-0 shadow-sm text-center hover:shadow-md transition-shadow">
                <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{item.note}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href="/social-accounts">Link account</a>
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-10 max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 border-0 shadow-sm bg-blue-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Want true account linking?</h3>
                  <p className="text-slate-700">
                    I can wire each platform’s OAuth connection next, so you can sign in and truly connect each account where the platform allows it.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/social-accounts">Open Social Accounts</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Request account setup</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-slate-600">
              We help families, professionals, and business owners explore insurance solutions tailored to their real needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Term Life Insurance", desc: "Affordable coverage for a specific period" },
              { title: "Final Expense Insurance", desc: "Burial and funeral cost planning" },
              { title: "Indexed Universal Life", desc: "Potential growth with downside protection" },
              { title: "Mortgage Protection", desc: "Protect your home and family" },
              { title: "Business Insurance", desc: "Key person and buy-sell funding" },
              { title: "Children's Accounts", desc: "Build financial security for the next generation" },
            ].map((service, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px]">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/services">Explore All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Agent access</h2>
            <p className="text-xl text-slate-600">
              Approved agents can log in to see more information than the public site: leads, CRM data, training, and back-office tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Private lead info", desc: "See captured names, emails, and phone numbers in the back office." },
              { title: "Training & scripts", desc: "Give agents better information for follow-up and sales conversations." },
              { title: "Team tools", desc: "Put your CRM, social links, and support resources in one place." },
            ].map(item => (
              <Card key={item.title} className="p-6 border-0 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/agent-portal"><LogIn className="w-4 h-4 mr-2" />Agent Portal</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/join-our-team">Join as an agent</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What our clients say</h2>
            <p className="text-xl text-slate-600">
              Families and professionals trust WEDOIT Insurance to guide them through important financial decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The team at WEDOIT made the process simple and stress-free. I finally understand my coverage options.",
                author: "Sarah M.",
                state: "NM",
              },
              {
                quote: "Professional, knowledgeable, and genuinely interested in my family's protection. Highly recommended.",
                author: "James T.",
                state: "TX",
              },
              {
                quote: "Best decision I made was getting a policy review. They found better coverage at a lower rate.",
                author: "Maria L.",
                state: "CA",
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm">
                <div className="flex gap-1 mb-4 text-yellow-400">★★★★★</div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-slate-900">
                  {testimonial.author}, {testimonial.state}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to protect your family?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free quote comparison from a licensed independent broker. No pressure. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-semibold" asChild>
              <a href="#quote-form">Check My Coverage Options</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
              asChild
            >
              <a href="https://calendly.com/wedoit2024/60min" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {showQuoteForm ? (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
              <Card className="p-6">Loading quote form…</Card>
            </div>
          }
        >
          <QuoteFormModal onClose={() => setShowQuoteForm(false)} />
        </Suspense>
      ) : null}
    </div>
  );
}
