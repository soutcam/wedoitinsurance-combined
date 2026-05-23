import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

interface QuoteFormContentProps {
  heading?: string;
  description?: string;
  submitLabel?: string;
  successTitle?: string;
  successDescription?: string;
  showHeading?: boolean;
  autoCloseDelayMs?: number;
  onCompleted?: () => void;
  compact?: boolean;
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const COVERAGE_TYPES = [
  "Term Life",
  "Whole Life",
  "Indexed Universal Life (IUL)",
  "Final Expense",
  "Mortgage Protection",
  "Business Insurance",
  "Children's Account",
  "Not Sure",
];

export default function QuoteFormContent({
  heading = "Get Your Free Life Insurance Quote",
  description = "Compare coverage from multiple carriers. No pressure. No obligation.",
  submitLabel = "Get My Quote",
  successTitle = "Thank You!",
  successDescription = "Your quote request has been received. We'll contact you within one business day.",
  showHeading = true,
  autoCloseDelayMs,
  onCompleted,
  compact = false,
}: QuoteFormContentProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    coverageType: "",
    preferredContact: "email",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitQuote = trpc.leads.submitQuote.useMutation();

  useEffect(() => {
    if (!submitted || !autoCloseDelayMs || !onCompleted) return;

    const timer = window.setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        state: "",
        coverageType: "",
        preferredContact: "email",
        message: "",
      });
      onCompleted();
    }, autoCloseDelayMs);

    return () => window.clearTimeout(timer);
  }, [autoCloseDelayMs, onCompleted, submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.state || !formData.coverageType) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitQuote.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        state: "",
        coverageType: "",
        preferredContact: "email",
        message: "",
      });
      toast.success("Quote request submitted! We'll contact you soon.");
    } catch (error) {
      console.error("[QuoteForm] Failed to submit quote:", error);
      toast.error("Failed to submit quote. Please try again.");
    }
  };

  return submitted ? (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{successTitle}</h3>
      <p className="text-slate-600">{successDescription}</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      {showHeading ? (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{heading}</h2>
          <p className="text-slate-600">{description}</p>
        </div>
      ) : null}

      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="state">State *</Label>
          <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="coverageType">Coverage Type *</Label>
          <Select value={formData.coverageType} onValueChange={(value) => handleSelectChange("coverageType", value)}>
            <SelectTrigger id="coverageType">
              <SelectValue placeholder="Select coverage type" />
            </SelectTrigger>
            <SelectContent>
              {COVERAGE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="preferredContact">Preferred Contact Method *</Label>
        <Select value={formData.preferredContact} onValueChange={(value) => handleSelectChange("preferredContact", value)}>
          <SelectTrigger id="preferredContact">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your insurance needs..."
          value={formData.message}
          onChange={handleChange}
          rows={compact ? 3 : 4}
        />
      </div>

      <div className="bg-slate-50 p-3 rounded text-xs text-slate-600" id="quote-privacy-note">
        <p className="font-semibold mb-1">Privacy Note:</p>
        <p>Your information is used only to contact you about insurance options and is not sold. Coverage is subject to underwriting approval.</p>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={submitQuote.isPending}
      >
        {submitQuote.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
