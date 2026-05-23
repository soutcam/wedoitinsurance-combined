import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, Play, Download, Lock, Mail, Sparkles, FileText } from "lucide-react";

type TabKey = "audio" | "video" | "text" | "premium";

type ResourceItem = {
  title: string;
  description: string;
  typeLabel: string;
  href: string;
  access: "free" | "premium";
};

const tabs: Array<{ key: TabKey; label: string; icon: typeof BookOpen }> = [
  { key: "audio", label: "Audio", icon: Headphones },
  { key: "video", label: "Video", icon: Play },
  { key: "text", label: "Text / Books", icon: BookOpen },
  { key: "premium", label: "Premium", icon: Lock },
];

const resources: Record<TabKey, ResourceItem[]> = {
  audio: [
    {
      title: "Why families buy life insurance",
      description: "A quick audio overview of the real reasons people reach out.",
      typeLabel: "Audio",
      href: "/podcast",
      access: "free",
    },
    {
      title: "What to ask before you apply",
      description: "A short listen that helps you avoid common mistakes.",
      typeLabel: "Audio",
      href: "/podcast",
      access: "free",
    },
  ],
  video: [
    {
      title: "Term life insurance in plain English",
      description: "A short educational walkthrough for first-time buyers.",
      typeLabel: "Video",
      href: "/videos",
      access: "free",
    },
    {
      title: "How the quote process works",
      description: "See how we compare options and help you choose calmly.",
      typeLabel: "Video",
      href: "/videos",
      access: "free",
    },
  ],
  text: [
    {
      title: "Family Protection Guide",
      description: "A simple worksheet for figuring out how much coverage makes sense.",
      typeLabel: "Downloadable text guide",
      href: "/resources/family-protection-guide.txt",
      access: "free",
    },
    {
      title: "Quote Checklist",
      description: "Bring the right details so your review is fast and focused.",
      typeLabel: "Downloadable checklist",
      href: "/resources/quote-checklist.txt",
      access: "free",
    },
  ],
  premium: [
    {
      title: "Advanced buying guide",
      description: "A deeper guide for people comparing term, whole life, and indexed options.",
      typeLabel: "Premium download",
      href: "/resources/family-protection-guide.txt",
      access: "premium",
    },
    {
      title: "Agent starter pack",
      description: "Training notes and talking points for new people entering the business.",
      typeLabel: "Premium download",
      href: "/resources/quote-checklist.txt",
      access: "premium",
    },
  ],
};

const PREMIUM_UNLOCK_KEY = "wedoit-premium-library-unlocked";
const PREMIUM_EMAIL_KEY = "wedoit-premium-library-email";

export default function Resources() {
  const [activeTab, setActiveTab] = useState<TabKey>("audio");
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUnlocked(window.localStorage.getItem(PREMIUM_UNLOCK_KEY) === "1");
    setEmail(window.localStorage.getItem(PREMIUM_EMAIL_KEY) ?? "");
  }, []);

  const counts = useMemo(() => {
    const total = Object.values(resources).flat().length;
    const premium = resources.premium.length;
    return { total, premium };
  }, []);

  const saveAccess = () => {
    if (typeof window === "undefined") return;
    if (!email.trim()) return;
    window.localStorage.setItem(PREMIUM_UNLOCK_KEY, "1");
    window.localStorage.setItem(PREMIUM_EMAIL_KEY, email.trim());
    setUnlocked(true);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-300 font-semibold tracking-wide uppercase mb-4">Resources & Education</p>
          <h1 className="text-5xl font-bold mb-4">Choose the format that fits you</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Browse audio, video, and text resources built to help families understand coverage options.
            Some pieces are open, and a few deeper guides unlock with a quick email.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-4 py-2">{counts.total} resources</span>
            <span className="rounded-full bg-white/10 px-4 py-2">{counts.premium} premium guides</span>
            <span className="rounded-full bg-white/10 px-4 py-2">Family-first education</span>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-all ${
                    active ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 capitalize">{activeTab === "text" ? "Text / Books" : activeTab}</h2>
            <p className="text-xl text-slate-600">
              {activeTab === "audio" && "Listen to quick breakdowns when you’re driving, working, or multitasking."}
              {activeTab === "video" && "Watch short explainers for clear, visual walkthroughs of coverage topics."}
              {activeTab === "text" && "Downloadable guides and checklists you can save, print, or share."}
              {activeTab === "premium" && "A few deeper guides for people who want more detail before they decide."}
            </p>
          </div>

          {activeTab === "premium" && !unlocked ? (
            <Card className="max-w-3xl mx-auto p-6 md:p-8 border-0 shadow-sm bg-white">
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold">Unlock the premium library</h3>
                  <p className="text-slate-600">
                    Leave an email so we can send the deeper guides when they’re ready.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveAccess}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send me access
                </Button>
              </div>
              {saved ? <p className="text-sm text-emerald-600 mt-3">Access saved.</p> : null}
            </Card>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources[activeTab].map((item) => {
              const premiumLocked = item.access === "premium" && !unlocked;
              return (
                <Card key={item.title} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Badge variant={item.access === "premium" ? "secondary" : "outline"}>
                      {item.typeLabel}
                    </Badge>
                    {item.access === "premium" ? <Lock className="w-4 h-4 text-slate-400" /> : <Sparkles className="w-4 h-4 text-blue-500" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-6 flex-1">{item.description}</p>
                  <Button asChild variant={premiumLocked ? "outline" : "default"} className={premiumLocked ? "border-slate-300" : "bg-blue-600 hover:bg-blue-700"}>
                    <a href={premiumLocked ? "#premium-unlock" : item.href} download={item.href.endsWith(".txt") ? "" : undefined}>
                      {premiumLocked ? "Unlock access" : item.access === "free" && item.href.endsWith(".txt") ? "Download" : "Open"}
                    </a>
                  </Button>
                </Card>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 border-0 shadow-sm bg-white">
              <h3 className="font-semibold mb-2">Audio</h3>
              <p className="text-sm text-slate-600">Short explainers for busy people.</p>
            </Card>
            <Card className="p-6 border-0 shadow-sm bg-white">
              <h3 className="font-semibold mb-2">Video</h3>
              <p className="text-sm text-slate-600">Clear visual walkthroughs and quick lessons.</p>
            </Card>
            <Card className="p-6 border-0 shadow-sm bg-white">
              <h3 className="font-semibold mb-2">Text / Books</h3>
              <p className="text-sm text-slate-600">Downloadable guides, checklists, and reading material.</p>
            </Card>
          </div>

          <div className="text-center text-sm text-slate-500">
            Need a custom guide or a private resource for your team? <a className="text-blue-600 hover:underline" href="/contact">Ask here</a>.
          </div>
        </div>
      </section>

      <section id="premium-unlock" className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Want the deeper guides?</h2>
          <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
            Share your email once, and the premium resources stay a click away next time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for access"
              className="bg-white text-slate-900"
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveAccess}>
              Save access
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
