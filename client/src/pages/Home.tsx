import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuoteFormModal from "@/components/QuoteFormModal";
import { useState } from "react";
import { CheckCircle2, Users, Award, Shield, Zap } from "lucide-react";

export default function Home() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Protect Your Family's Future
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              Compare life insurance from multiple carriers with clear guidance and no pressure. Build a stronger financial future with WEDOIT Insurance.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all hover:shadow-lg"
                onClick={() => setShowQuoteForm(true)}
              >
                Get My Free Life Insurance Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg"
                onClick={() => setShowQuoteForm(true)}
              >
                Book a Free Policy Review
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-700">
              {[
                { icon: Shield, label: "Independent Broker" },
                { icon: Zap, label: "Multi-Carrier Access" },
                { icon: Award, label: "Licensed Advisors" },
                { icon: Users, label: "No-Pressure Education" },
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

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "500+", label: "Families Supported" },
              { stat: "$50M+", label: "Coverage Provided" },
              { stat: "15+", label: "Years Combined Experience" },
            ].map((item, idx) => (
              <Card key={idx} className="p-8 text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{item.stat}</div>
                <p className="text-lg text-slate-600">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">About WEDOIT Insurance</h2>
            <p className="text-xl text-slate-600">
              We’re independent brokers helping you compare coverage from multiple carriers—clear guidance, no pressure, and support when it matters.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Independent Broker</h3>
              <p className="text-slate-600">We work for you, not any single company.</p>
            </Card>
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Multi-Carrier Access</h3>
              <p className="text-slate-600">We compare options and help you choose confidently.</p>
            </Card>
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">No-Pressure Education</h3>
              <p className="text-slate-600">We explain what you’re buying in plain English.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-slate-600">
              We help families, professionals, and business owners explore insurance solutions tailored to their unique needs.
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
	              <a href="/services">Explore All Services</a>
	            </Button>
	          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
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
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-slate-900">
                  {testimonial.author}, {testimonial.state}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Life Insurance Types — Quick Guide</h2>
            <p className="text-xl text-slate-600">
              Different policies protect in different ways. Here’s the fast overview we use when helping clients compare options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Term Life", desc: "Coverage for a specific period (often 10–30 years). Usually the most affordable for coverage size." },
              { title: "Whole Life", desc: "Permanent coverage with potential cash value growth (details vary by carrier)." },
              { title: "IUL", desc: "Permanent coverage tied to an index, with downside protection depending on the contract." },
              { title: "Final Expense", desc: "Helps cover burial and funeral costs, often with simpler underwriting." },
              { title: "Mortgage Protection", desc: "Helps protect your home by covering mortgage payments if something happens." },
              { title: "Business & Key Person", desc: "Protects business continuity and key people—often connected to planning." },
            ].map((x, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{x.title}</h3>
                <p className="text-slate-600">{x.desc}</p>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10 text-center text-sm text-slate-500">
            Availability and pricing depend on the carrier, your health, underwriting, and state.
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Protect Your Family?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free quote comparison from a licensed independent broker. No pressure. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-semibold"
              onClick={() => setShowQuoteForm(true)}
            >
              Get My Free Life Insurance Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
              onClick={() => setShowQuoteForm(true)}
            >
              Book a Free Policy Review
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Form Modal */}
      {showQuoteForm && <QuoteFormModal onClose={() => setShowQuoteForm(false)} />}
    </div>
  );
}
