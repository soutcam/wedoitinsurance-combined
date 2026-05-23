import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Linkedin, Youtube, X, Link2, Save } from "lucide-react";

type PlatformKey = "linkedin" | "facebook" | "instagram" | "youtube" | "x";

const PLATFORMS: Array<{
  key: PlatformKey;
  name: string;
  icon: typeof Linkedin;
  placeholder: string;
}> = [
  { key: "linkedin", name: "LinkedIn", icon: Linkedin, placeholder: "https://www.linkedin.com/in/your-profile" },
  { key: "facebook", name: "Facebook", icon: Facebook, placeholder: "https://www.facebook.com/your-page" },
  { key: "instagram", name: "Instagram", icon: Instagram, placeholder: "https://www.instagram.com/your-handle" },
  { key: "youtube", name: "YouTube", icon: Youtube, placeholder: "https://www.youtube.com/@your-channel" },
  { key: "x", name: "X", icon: X, placeholder: "https://x.com/your-handle" },
];

const STORAGE_KEY = "wedoit-social-accounts";

function readStoredLinks(): Record<PlatformKey, string> {
  if (typeof window === "undefined") return { linkedin: "", facebook: "", instagram: "", youtube: "", x: "" };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { linkedin: "", facebook: "", instagram: "", youtube: "", x: "" };
    return { linkedin: "", facebook: "", instagram: "", youtube: "", x: "", ...JSON.parse(raw) };
  } catch {
    return { linkedin: "", facebook: "", instagram: "", youtube: "", x: "" };
  }
}

export default function SocialAccounts() {
  const [links, setLinks] = useState<Record<PlatformKey, string>>({ linkedin: "", facebook: "", instagram: "", youtube: "", x: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLinks(readStoredLinks());
  }, []);

  const connectedCount = useMemo(() => Object.values(links).filter(Boolean).length, [links]);

  const saveLinks = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 space-y-8 max-w-5xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Back office</p>
            <h1 className="text-4xl font-bold">Social Accounts</h1>
            <p className="text-slate-600 mt-2">
              Add your public profile links in one place so the team can launch them fast.
            </p>
          </div>
          <Badge variant="secondary" className="w-fit">{connectedCount} connected</Badge>
        </div>

        <Card className="p-6 md:p-8 border-0 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Link2 className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">Link your accounts</h2>
              <p className="text-sm text-slate-500">Store the profile URLs you want shown inside the portal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              const value = links[platform.key] || "";
              return (
                <div key={platform.key} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">{platform.name}</h3>
                      <p className="text-xs text-slate-500">{value ? "Connected" : "Not linked yet"}</p>
                    </div>
                  </div>
                  <Input
                    value={value}
                    onChange={(e) => setLinks((prev) => ({ ...prev, [platform.key]: e.target.value }))}
                    placeholder={platform.placeholder}
                  />
                  <Button asChild variant="outline" className="w-full" disabled={!value}>
                    <a href={value || "#"} target="_blank" rel="noopener noreferrer">
                      Open profile
                    </a>
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveLinks}>
              <Save className="w-4 h-4 mr-2" />
              Save links
            </Button>
            <Button variant="outline" asChild>
              <a href="/agent-portal">Back to Agent Portal</a>
            </Button>
          </div>

          {saved ? <p className="text-sm text-emerald-600 mt-3">Saved.</p> : null}
        </Card>
      </div>
    </div>
  );
}
