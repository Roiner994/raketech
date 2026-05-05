import { resolveStorefrontTheme, type StorefrontId, type StorefrontTheme } from "@raketech/ui";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export async function getStorefrontTheme(
  storefrontId: StorefrontId
): Promise<StorefrontTheme> {
  if (!projectId) {
    return "dark";
  }

  const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/storefrontSettings/${storefrontId}`;
  const url = apiKey ? `${baseUrl}?key=${encodeURIComponent(apiKey)}` : baseUrl;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return "dark";
    }

    const payload = (await response.json()) as {
      fields?: { theme?: { stringValue?: unknown } };
    };

    return resolveStorefrontTheme(payload.fields?.theme?.stringValue);
  } catch {
    return "dark";
  }
}
