"use client";

import { LoginCard } from "@raketech/ui";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    // UI-only for now — wire to auth provider in Phase 5
    if (email && password) {
      router.push("/dashboard");
    }
  };

  return <LoginCard onLogin={handleLogin} />;
}
