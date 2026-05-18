import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Shield, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About WEDOIT Insurance</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Helping families and professionals protect what matters most.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                WEDOIT Insurance was founded on a simple belief: families deserve clear, honest guidance when it comes to protecting their financial future. Too often, people feel confused or pressured when shopping for life insurance. We wanted to change that.
              </p>
              <p>
                With over 15 years of combined experience in life insurance and financial planning, our team has helped hundreds of families find coverage that fits their lives and budgets. We work as independent brokers, which means we're not tied to any single insurance company. We work for you.
              </p>
              <p>
                Our mission is simple: educate first, then help you choose coverage with confidence. No pressure. No hidden agendas. Just honest, expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Licensing */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Credentials & Licensing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Licensed Advisors</h3>
                <p className="text-slate-700 mb-4">
                  Our team members are licensed life insurance agents with current, active licenses in all 50 states.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>✓ Life Insurance License</li>
                  <li>✓ Continuing Education Current</li>
                  <li>✓ Background Verified</li>
                  <li>✓ Compliant with State Regulations</li>
                </ul>
              </Card>

              <Card className="p-8 border-0 shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Independent Broker</h3>
                <p className="text-slate-700 mb-4">
                  WEDOIT Insurance LLC is an independent insurance broker, not an insurance company.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>✓ Multi-Carrier Access</li>
                  <li>✓ No Carrier Affiliation</li>
                  <li>✓ Client-First Approach</li>
                  <li>✓ Transparent Pricing</li>
                </ul>
              </Card>
            </div>

            {/* Important Disclosures */}
            <Card className="p-8 border-0 shadow-sm bg-blue-50">
              <h3 className="text-xl font-bold mb-4">Important Disclosures</h3>
              <div className="space-y-4 text-slate-700">
                <p>
                  <span className="font-semibold">Company:</span> WEDOIT Insurance LLC is an independent insurance broker.
                </p>
                <p>
                  <span className="font-semibold">Service Area:</span> We serve clients in all 50 states. Product availability varies by state and carrier.
                </p>
                <p>
                  <span className="font-semibold">Underwriting:</span> All applications are subject to underwriting approval by the insurance carrier.
                </p>
                <p>
                  <span className="font-semibold">Licensing:</span> Our advisors are licensed to sell life insurance in all 50 states. License information is available upon request.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Families Trust Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Independent Broker",
                description: "We work for you, not for any insurance company.",
              },
              {
                icon: Zap,
                title: "Multi-Carrier Access",
                description: "We compare options from dozens of carriers.",
              },
              {
                icon: Award,
                title: "Licensed Advisors",
                description: "15+ years of combined experience and expertise.",
              },
              {
                icon: Users,
                title: "No-Pressure Education",
                description: "We explain options clearly so you decide.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm text-center">
                <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: "500+", label: "Families Supported" },
              { stat: "$50M+", label: "Coverage Provided" },
              { stat: "98%", label: "Client Satisfaction" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-blue-600 mb-2">{item.stat}</div>
                <p className="text-lg text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Protect Your Family</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with one of our licensed advisors.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-semibold"
            asChild
          >
            <Link href="/contact">Book a Free Policy Review</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
