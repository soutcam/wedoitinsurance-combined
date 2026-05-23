import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import QuoteFormModal from "@/components/QuoteFormModal";
import { Link } from "wouter";
import LifeInsuranceCalculator from "@/components/LifeInsuranceCalculator";

const services = [
  {
    title: "Term Life Insurance",
    description: "Affordable protection for a specific period, typically 10-30 years.",
    note: "A smart choice when you want the most coverage for the lowest cost during the years your family depends on your income.",
    benefits: [
      "Lowest cost life insurance option",
      "Simple, straightforward coverage",
      "Conversion options to permanent insurance",
      "Ideal for families with young children",
    ],
    ideal: "Young families, working professionals, mortgage holders",
  },
  {
    title: "Final Expense Insurance",
    description: "Simplified underwriting to cover burial and funeral costs.",
    note: "Helps families avoid out-of-pocket funeral costs and reduces stress during a difficult time.",
    benefits: [
      "Quick approval process",
      "Covers funeral, burial, and related expenses",
      "Available up to age 85",
      "No medical exam required",
    ],
    ideal: "Seniors, individuals with health conditions",
  },
  {
    title: "Indexed Universal Life (IUL)",
    description: "Potential growth linked to market index with downside protection.",
    note: "Useful if you want permanent coverage plus a cash value strategy with flexible premiums.",
    benefits: [
      "Potential for higher returns",
      "Protected from market downturns",
      "Flexible premiums and death benefits",
      "Tax-advantaged growth",
    ],
    ideal: "Individuals seeking growth potential with protection",
  },
  {
    title: "Mortgage Protection",
    description: "Ensure your family keeps the home if something happens to you.",
    note: "Consider this if your mortgage is one of your biggest monthly obligations and you want your family to stay in the home.",
    benefits: [
      "Covers outstanding mortgage balance",
      "Protects family home",
      "Lower cost than term life",
      "Simple application process",
    ],
    ideal: "Homeowners with significant mortgages",
  },
  {
    title: "Business & Key Person Insurance",
    description: "Protect your business and partners with strategic coverage.",
    note: "Important when a key owner or team member would create financial strain if they were no longer able to work.",
    benefits: [
      "Buy-sell agreement funding",
      "Key person protection",
      "Business continuity planning",
      "Tax-advantaged structure",
    ],
    ideal: "Business owners, partnerships",
  },
  {
    title: "Children's Financial Future Accounts",
    description: "Build wealth for your children with guaranteed growth.",
    note: "A long-term option for families who want to start building protection and financial habits early.",
    benefits: [
      "Tax-free growth potential",
      "Guaranteed minimum returns",
      "Flexible withdrawal options",
      "Lifetime protection",
    ],
    ideal: "Parents planning for children's future",
  },
];

export default function Services() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            We help families, professionals, and business owners find insurance solutions tailored to their unique needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="p-8 border-0 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>

                <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Why consider it: </span>
                    {service.note}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-1">✓</span>
                        <span className="text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm">
                    <span className="font-semibold text-slate-900">Ideal for: </span>
                    <span className="text-slate-700">{service.ideal}</span>
                  </p>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowQuoteForm(true)}
                >
                  Check My Coverage Options
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <LifeInsuranceCalculator />

      {/* Why Choose WEDOIT */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose WEDOIT Insurance?</h2>
              <p className="text-xl text-slate-600">
              We're independent brokers committed to finding the best coverage for families, professionals, and anyone supporting dependents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Multi-Carrier Access",
                description: "We work with dozens of carriers to find the best rates and coverage for you.",
              },
              {
                title: "Licensed Advisors",
                description: "Our team has 15+ years of combined experience in life insurance and financial planning.",
              },
              {
                title: "No-Pressure Education",
                description: "We explain your options clearly so you can make informed decisions with confidence.",
              },
              {
                title: "Independent Broker",
                description: "We're not tied to any single insurance company, so we work for you, not them.",
              },
              {
                title: "Personalized Service",
                description: "Every family's situation is unique. We create customized solutions for your needs.",
              },
              {
                title: "Ongoing Support",
                description: "We're here to help with coverage updates, beneficiary changes, and claims support.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Coverage?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a quote comparison from a licensed independent broker. No pressure. No obligation.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-semibold"
              onClick={() => setShowQuoteForm(true)}
            >
              Check My Coverage Options
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Form Modal */}
      {showQuoteForm && <QuoteFormModal onClose={() => setShowQuoteForm(false)} />}
    </div>
  );
}
