"use client";

import { useEffect, useState } from "react";
import { LoginCard } from "@raketech/ui";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard/digital");
      }
    });

    return unsubscribe;
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/dashboard/digital");
    } catch (loginError) {
      console.error("Admin login failed:", loginError);
      setError("Credenciales inválidas o usuario sin permisos.");
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginCard onLogin={handleLogin} isLoading={isLoading} error={error} />;
}
