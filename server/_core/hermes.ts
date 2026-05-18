import { ENV } from "./env";

export type HermesAnalyzeLeadPayload = {
  lead_id: string;
  pipeline: string;
  channel: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  notes?: string;
  context?: Record<string, unknown>;
};

export type HermesAnalyzeLeadResult = {
  stage?: string;
  lead_score?: number;
  classification?: string;
  next_action?: string;
  message_text?: string;
  reply_window_hours?: number;
  followups?: Array<{ delay_hours: number; action: string }>;
  tags?: string[];
  [k: string]: unknown;
};

export async function analyzeLeadWithHermes(
  payload: HermesAnalyzeLeadPayload
): Promise<HermesAnalyzeLeadResult | null> {
  if (!ENV.hermesAnalyzeUrl) return null;
  if (!ENV.hermesAuthToken) return null;

  const res = await fetch(ENV.hermesAnalyzeUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.hermesAuthToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as HermesAnalyzeLeadResult;
  return data;
}

