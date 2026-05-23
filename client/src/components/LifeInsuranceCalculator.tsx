import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

function parseNumber(value: string) {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

const COVERAGE_OPTIONS = [
  {
    id: "family",
    label: "Family Protection",
    description: "Income replacement + mortgage + debts + education",
    years: 10,
    includeMortgage: true,
    includeDebt: true,
    includeFinalExpenses: true,
    includeEducation: true,
  },
  {
    id: "mortgage",
    label: "Mortgage Protection",
    description: "Focus on the home, debts, and final expenses",
    years: 5,
    includeMortgage: true,
    includeDebt: true,
    includeFinalExpenses: true,
    includeEducation: false,
  },
  {
    id: "final",
    label: "Final Expense",
    description: "Smaller coverage need for burial and final bills",
    years: 1,
    includeMortgage: false,
    includeDebt: true,
    includeFinalExpenses: true,
    includeEducation: false,
  },
  {
    id: "legacy",
    label: "Legacy / Permanent Coverage",
    description: "Longer income replacement with family security goals",
    years: 15,
    includeMortgage: true,
    includeDebt: true,
    includeFinalExpenses: true,
    includeEducation: true,
  },
  {
    id: "business",
    label: "Business Protection",
    description: "Business debt and owner income replacement planning",
    years: 8,
    includeMortgage: false,
    includeDebt: true,
    includeFinalExpenses: true,
    includeEducation: false,
  },
] as const;

const DEFAULT_OPTION = COVERAGE_OPTIONS[0].id;

type CoverageOptionId = (typeof COVERAGE_OPTIONS)[number]["id"];
type HealthClass = "preferred" | "standard" | "substandard";

const POLICY_PROFILES = [
  {
    id: "term",
    label: "Term Life",
    note: "Best for low-cost protection while income, mortgage, and kids still need support.",
    kind: "premium" as const,
    baseRateLow: 0.18,
    baseRateHigh: 0.42,
    usesTermYears: true,
  },
  {
    id: "final-expense",
    label: "Final Expense",
    note: "Smaller coverage, but pricing is usually higher per $1,000 because it is easier to qualify for.",
    kind: "premium" as const,
    baseRateLow: 0.95,
    baseRateHigh: 1.9,
    usesTermYears: false,
  },
  {
    id: "iul",
    label: "IUL",
    note: "Permanent coverage with cash value potential, so monthly cost is usually higher.",
    kind: "premium" as const,
    baseRateLow: 2.5,
    baseRateHigh: 6.5,
    usesTermYears: false,
  },
  {
    id: "mortgage",
    label: "Mortgage Protection",
    note: "Usually priced like term coverage and focused on keeping the home protected.",
    kind: "premium" as const,
    baseRateLow: 0.22,
    baseRateHigh: 0.55,
    usesTermYears: true,
  },
  {
    id: "business",
    label: "Business / Key Person",
    note: "Depends on business size, role, and the amount of income or debt that needs protecting.",
    kind: "premium" as const,
    baseRateLow: 0.28,
    baseRateHigh: 0.78,
    usesTermYears: true,
  },
  {
    id: "children",
    label: "Children's Future",
    note: "Shown as a monthly contribution estimate instead of a premium.",
    kind: "contribution" as const,
    baseRateLow: 40,
    baseRateHigh: 150,
    usesTermYears: false,
  },
] as const;

export default function LifeInsuranceCalculator() {
  const [selectedOption, setSelectedOption] = useState<CoverageOptionId>(DEFAULT_OPTION);
  const [form, setForm] = useState({
    annualIncome: "75000",
    mortgageBalance: "250000",
    otherDebt: "15000",
    finalExpenses: "15000",
    collegeFunds: "0",
    existingCoverage: "0",
    emergencySavings: "10000",
    age: "35",
    termYears: "20",
    tobaccoUse: "no",
    healthClass: "standard" as HealthClass,
    name: "",
    email: "",
    phone: "",
  });
  const [isSending, setIsSending] = useState(false);

  const submitReportRequest = trpc.leads.submitContact.useMutation();

  const activeOption = COVERAGE_OPTIONS.find((option) => option.id === selectedOption) ?? COVERAGE_OPTIONS[0];

  const result = useMemo(() => {
    const annualIncome = parseNumber(form.annualIncome);
    const mortgageBalance = parseNumber(form.mortgageBalance);
    const otherDebt = parseNumber(form.otherDebt);
    const finalExpenses = parseNumber(form.finalExpenses);
    const collegeFunds = parseNumber(form.collegeFunds);
    const existingCoverage = parseNumber(form.existingCoverage);
    const emergencySavings = parseNumber(form.emergencySavings);
    const age = parseNumber(form.age);
    const yearsToReplace = Math.max(0, activeOption.years);

    const incomeReplacement = annualIncome * yearsToReplace;
    const mortgageNeed = activeOption.includeMortgage ? mortgageBalance : 0;
    const debtNeed = activeOption.includeDebt ? otherDebt : 0;
    const finalExpenseNeed = activeOption.includeFinalExpenses ? finalExpenses : 0;
    const educationNeed = activeOption.includeEducation ? collegeFunds : 0;

    const grossNeed = incomeReplacement + mortgageNeed + debtNeed + finalExpenseNeed + educationNeed;
    const netNeed = Math.max(0, grossNeed - existingCoverage - emergencySavings);

    return {
      incomeReplacement,
      mortgageNeed,
      debtNeed,
      finalExpenseNeed,
      educationNeed,
      grossNeed,
      netNeed,
      monthlyEquivalent: netNeed / 12,
      age,
    };
  }, [activeOption, form]);

  const policySimulations = useMemo(() => {
    const ageFactor = 1 + Math.max(0, result.age - 35) * 0.018;
    const tobaccoFactor = form.tobaccoUse === "yes" ? 1.7 : 1;
    const healthFactor: Record<HealthClass, number> = {
      preferred: 0.88,
      standard: 1,
      substandard: 1.35,
    };
    const qualityFactor = healthFactor[form.healthClass];
    const termYears = Math.max(1, parseNumber(form.termYears) || activeOption.years);
    const termFactor = Math.max(0.7, Math.min(1.45, 20 / termYears));

    const premiumRange = (coverage: number, lowRate: number, highRate: number, usesTermYears: boolean) => {
      const durationFactor = usesTermYears ? termFactor : 1;
      const low = (coverage / 1000) * lowRate * ageFactor * tobaccoFactor * qualityFactor * durationFactor;
      const high = (coverage / 1000) * highRate * ageFactor * tobaccoFactor * qualityFactor * durationFactor;
      return { low, high };
    };

    const termCoverage = result.netNeed;
    const mortgageCoverage = result.mortgageNeed + result.debtNeed + result.finalExpenseNeed;
    const finalExpenseCoverage = Math.max(result.finalExpenseNeed, 15000);
    const iulCoverage = Math.max(result.grossNeed, result.netNeed);
    const businessCoverage = Math.max(result.grossNeed * 1.1, 100000);
    const childrenContributionBase = Math.max(result.educationNeed, 25000);

    return POLICY_PROFILES.map((profile) => {
      if (profile.kind === "contribution") {
        const low = Math.max(40, (childrenContributionBase / 1000) * profile.baseRateLow * ageFactor * qualityFactor);
        const high = Math.max(low + 20, (childrenContributionBase / 1000) * profile.baseRateHigh * ageFactor * qualityFactor);
        return {
          ...profile,
          amount: childrenContributionBase,
          low,
          high,
          labelSuffix: "monthly contribution",
        };
      }

      const coverage =
        profile.id === "term"
          ? termCoverage
          : profile.id === "mortgage"
            ? mortgageCoverage
            : profile.id === "final-expense"
              ? finalExpenseCoverage
              : profile.id === "iul"
                ? iulCoverage
                : businessCoverage;
      const { low, high } = premiumRange(coverage, profile.baseRateLow, profile.baseRateHigh, profile.usesTermYears);
      return {
        ...profile,
        amount: coverage,
        low,
        high,
        labelSuffix: "monthly premium",
      };
    });
  }, [activeOption.years, form.healthClass, form.termYears, form.tobaccoUse, result.age, result.debtNeed, result.finalExpenseNeed, result.grossNeed, result.mortgageNeed, result.netNeed]);

  const selectedSimulation = policySimulations.find((item) => {
    if (selectedOption === "family") return item.id === "term";
    if (selectedOption === "mortgage") return item.id === "mortgage";
    if (selectedOption === "final") return item.id === "final-expense";
    if (selectedOption === "legacy") return item.id === "iul";
    if (selectedOption === "business") return item.id === "business";
    return item.id === "children";
  }) ?? policySimulations[0];

  const handleChange = (name: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const buildReportText = () => {
    return [
      "WEDOIT Insurance Coverage Estimate",
      "=================================",
      `Coverage option: ${activeOption.label}`,
      `Estimated need: ${formatCurrency(result.netNeed)}`,
      `Gross need: ${formatCurrency(result.grossNeed)}`,
      `Income replacement: ${formatCurrency(result.incomeReplacement)}`,
      `Mortgage protection: ${formatCurrency(result.mortgageNeed)}`,
      `Debt payoff: ${formatCurrency(result.debtNeed)}`,
      `Final expenses: ${formatCurrency(result.finalExpenseNeed)}`,
      `Education goal: ${formatCurrency(result.educationNeed)}`,
      `Existing coverage: ${formatCurrency(parseNumber(form.existingCoverage))}`,
      `Savings / assets: ${formatCurrency(parseNumber(form.emergencySavings))}`,
      `Rough monthly equivalent: ${formatCurrency(result.monthlyEquivalent)}`,
      `Estimated ${selectedSimulation.labelSuffix}: ${formatCurrency(selectedSimulation.low)} - ${formatCurrency(selectedSimulation.high)}`,
      "",
      "Note: This is a rough needs estimate, not a carrier quote or underwriting decision.",
    ].join("\n");
  };

  const handleDownloadReport = async () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name || !email || !phone) {
      toast.error("Name, email, and phone are required to download the report.");
      return;
    }

    setIsSending(true);
    try {
      await submitReportRequest.mutateAsync({
        name,
        email,
        phone,
        subject: "Calculator report request",
        message: `${activeOption.label} report requested. Estimated coverage: ${formatCurrency(result.netNeed)}.`,
      });

      const blob = new Blob([buildReportText()], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `wedoit-coverage-report-${selectedOption}.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success("Your report is ready to download.");
    } catch (error) {
      console.error("[Calculator] Failed to send/download report:", error);
      toast.error("We could not prepare the report right now. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-4">Life Insurance Calculator</h2>
            <p className="text-xl text-slate-600 mb-8">
              Pick a coverage goal, then get a quick estimate of the amount your family may need.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {COVERAGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className={`text-left rounded-xl border p-4 transition-all ${
                    selectedOption === option.id
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="font-semibold text-slate-900">{option.label}</div>
                  <div className="text-sm text-slate-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Input id="annualIncome" value={form.annualIncome} onChange={handleChange("annualIncome")} placeholder="75000" />
                </div>
              <div>
                <Label htmlFor="mortgageBalance">Mortgage Balance</Label>
                <Input id="mortgageBalance" value={form.mortgageBalance} onChange={handleChange("mortgageBalance")} placeholder="250000" />
              </div>
              <div>
                <Label htmlFor="otherDebt">Other Debt</Label>
                <Input id="otherDebt" value={form.otherDebt} onChange={handleChange("otherDebt")} placeholder="15000" />
              </div>
              <div>
                <Label htmlFor="finalExpenses">Final Expenses</Label>
                <Input id="finalExpenses" value={form.finalExpenses} onChange={handleChange("finalExpenses")} placeholder="15000" />
              </div>
              <div>
                <Label htmlFor="collegeFunds">Education / College Fund</Label>
                <Input id="collegeFunds" value={form.collegeFunds} onChange={handleChange("collegeFunds")} placeholder="0" />
              </div>
              <div>
                <Label htmlFor="existingCoverage">Existing Coverage</Label>
                <Input id="existingCoverage" value={form.existingCoverage} onChange={handleChange("existingCoverage")} placeholder="0" />
              </div>
                <div>
                  <Label htmlFor="emergencySavings">Emergency Savings / Assets</Label>
                  <Input id="emergencySavings" value={form.emergencySavings} onChange={handleChange("emergencySavings")} placeholder="10000" />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" value={form.age} onChange={handleChange("age")} placeholder="35" />
                </div>
                <div>
                  <Label htmlFor="termYears">Term Years</Label>
                  <Input id="termYears" value={form.termYears} onChange={handleChange("termYears")} placeholder="20" />
                </div>
                <div>
                  <Label htmlFor="tobaccoUse">Tobacco Use</Label>
                  <Input id="tobaccoUse" value={form.tobaccoUse} onChange={handleChange("tobaccoUse")} placeholder="no" />
                </div>
                <div>
                  <Label htmlFor="healthClass">Health Class</Label>
                  <Input id="healthClass" value={form.healthClass} onChange={handleChange("healthClass")} placeholder="standard" />
                </div>
              </div>
            </div>

          <Card className="p-6 md:p-8 border-0 shadow-sm bg-slate-50">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500">Estimated coverage need</p>
                <p className="text-5xl font-bold text-blue-600 mt-2">{formatCurrency(result.netNeed)}</p>
                <p className="text-sm text-slate-600 mt-2">Based on: {activeOption.label}</p>
              </div>

              <div className="space-y-4 text-slate-700">
                <div className="flex items-center justify-between gap-4">
                  <span>Income replacement</span>
                  <span className="font-semibold">{formatCurrency(result.incomeReplacement)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Mortgage protection</span>
                  <span className="font-semibold">{formatCurrency(result.mortgageNeed)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Debt payoff</span>
                  <span className="font-semibold">{formatCurrency(result.debtNeed)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Final expenses</span>
                  <span className="font-semibold">{formatCurrency(result.finalExpenseNeed)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Education goal</span>
                  <span className="font-semibold">{formatCurrency(result.educationNeed)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Assets / existing coverage</span>
                  <span className="font-semibold">-{formatCurrency(parseNumber(form.existingCoverage) + parseNumber(form.emergencySavings))}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex items-center justify-between gap-4">
                  <span className="font-medium">Rough monthly equivalent</span>
                  <span className="font-semibold">{formatCurrency(result.monthlyEquivalent)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">Estimated {selectedSimulation.labelSuffix}</span>
                  <span className="font-semibold">{formatCurrency(selectedSimulation.low)} - {formatCurrency(selectedSimulation.high)}</span>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 border border-slate-200 space-y-3">
                <p className="font-semibold text-slate-900">Policy simulations</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {policySimulations.map((policy) => (
                    <div key={policy.id} className={`rounded-lg border p-3 ${policy.id === selectedSimulation.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{policy.label}</p>
                          <p className="text-xs text-slate-500 mt-1">{policy.note}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs uppercase tracking-wide text-slate-500">{policy.labelSuffix}</p>
                          <p className="font-semibold text-slate-900">{formatCurrency(policy.low)} - {formatCurrency(policy.high)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 border border-slate-200 space-y-3">
                <p className="font-semibold text-slate-900">Get the full report</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input placeholder="Full name" value={form.name} onChange={handleChange("name")} />
                  <Input placeholder="Email" type="email" value={form.email} onChange={handleChange("email")} />
                  <Input placeholder="Phone" value={form.phone} onChange={handleChange("phone")} />
                </div>
                <Button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleDownloadReport}
                  disabled={isSending}
                >
                  {isSending ? "Preparing report..." : "Download Full Report"}
                </Button>
                <p className="text-xs text-slate-500">
                  Name, email, and phone are required before downloading the report.
                </p>
              </div>

              <div className="text-sm text-slate-500">
                This calculator is a rough needs-based estimate. Final coverage depends on underwriting, carrier options, and your goals.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
