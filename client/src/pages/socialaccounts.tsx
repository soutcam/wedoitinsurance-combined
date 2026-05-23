import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Linkedin, Youtube, X, Link2, Save, Plus, Trash2 } from "lucide-react";

type PlatformKey = "linkedin" | "facebook" | "instagram" | "youtube" | "x";

type CustomAccount = {
  id: string;
  name: string;
  url: string;
};

type StoredAccounts = {
  defaults: Record<PlatformKey, string>;
  custom: CustomAccount[];
};

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

function emptyDefaults(): Record<PlatformKey, string> {
  return { linkedin: "", facebook: "", instagram: "", youtube: "", x: "" };
}

function readStoredAccounts(): StoredAccounts {
  if (typeof window === "undefined") return { defaults: emptyDefaults(), custom: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { defaults: emptyDefaults(), custom: [] };
    const parsed = JSON.parse(raw) as Partial<StoredAccounts>;
    return {
      defaults: { ...emptyDefaults(), ...(parsed.defaults ?? {}) },
      custom: Array.isArray(parsed.custom) ? parsed.custom.filter(Boolean) : [],
    };
  } catch {
    return { defaults: emptyDefaults(), custom: [] };
  }
}

function makeId() {
  return `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function SocialAccounts() {
  const [defaults, setDefaults] = useState<Record<PlatformKey, string>>(emptyDefaults());
  const [custom, setCustom] = useState<CustomAccount[]>([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyUrl, setNewCompanyUrl] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = readStoredAccounts();
    setDefaults(stored.defaults);
    setCustom(stored.custom);
  }, []);

  const connectedCount = useMemo(
    () => [...Object.values(defaults), ...custom.map(account => account.url)].filter(Boolean).length,
    [defaults, custom]
  );

  const saveAll = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ defaults, custom }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  const addCustomCompany = () => {
    const name = newCompanyName.trim();
    const url = newCompanyUrl.trim();
    if (!name || !url) return;

    setCustom(prev => [
      ...prev,
      {
        id: makeId(),
        name,
        url,
      },
    ]);
    setNewCompanyName("");
    setNewCompanyUrl("");
  };

  const removeCustomCompany = (id: string) => {
    setCustom(prev => prev.filter(item => item.id !== id));
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
              const value = defaults[platform.key] || "";
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
                    onChange={(e) => setDefaults((prev) => ({ ...prev, [platform.key]: e.target.value }))}
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

          <div className="mt-8">
            <div className="flex items-start gap-3 mb-4">
              <Plus className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold">Add another social company</h2>
                <p className="text-sm text-slate-500">Use this for any new platform or future social account.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_auto] gap-3">
              <Input
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                placeholder="TikTok, Threads, Snapchat, Pinterest, etc."
              />
              <Input
                value={newCompanyUrl}
                onChange={(e) => setNewCompanyUrl(e.target.value)}
                placeholder="https://..."
              />
              <Button type="button" onClick={addCustomCompany} className="bg-blue-600 hover:bg-blue-700">
                Add
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              {custom.length === 0 ? (
                <p className="text-sm text-slate-500">No extra companies added yet.</p>
              ) : (
                custom.map((account) => (
                  <div key={account.id} className="flex flex-col md:flex-row md:items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{account.name}</p>
                      <p className="text-sm text-slate-500 truncate">{account.url}</p>
                    </div>
                    <Button asChild variant="outline" className="w-full md:w-auto">
                      <a href={account.url} target="_blank" rel="noopener noreferrer">
                        Open
                      </a>
                    </Button>
                    <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => removeCustomCompany(account.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveAll}>
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
