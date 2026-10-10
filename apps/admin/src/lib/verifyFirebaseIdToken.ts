interface FirebaseLookupResponse {
  users?: Array<{ localId?: string; email?: string }>;
  error?: { message?: string };
}

export async function verifyFirebaseIdToken(idToken: string): Promise<{ uid: string; email?: string }> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_FIREBASE_API_KEY");
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  const data = (await response.json()) as FirebaseLookupResponse;

  if (!response.ok || !data.users?.[0]?.localId) {
    throw new Error(data.error?.message || "Invalid Firebase ID token");
  }

  return {
    uid: data.users[0].localId,
    email: data.users[0].email,
  };
}
