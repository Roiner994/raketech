"use client";

import { useEffect, useState } from "react";
import { AdminSidebar, auth } from "@raketech/ui";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const digitalActive = pathname === "/dashboard/digital" || pathname.startsWith("/dashboard/products/digital");
  const physicalActive = pathname === "/dashboard/physical" || pathname.startsWith("/dashboard/products/physical");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      } else {
        setIsCheckingSession(false);
      }
    });

    return unsubscribe;
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } finally {
      router.replace("/");
    }
  };

  if (isCheckingSession) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B1120]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B1120]">
      <AdminSidebar
        links={[
          { label: "Juegos Digitales", href: "/dashboard/digital", icon: "games", active: digitalActive },
          { label: "Impresiones 3D", href: "/dashboard/physical", icon: "print", active: physicalActive },
        ]}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => void handleLogout()}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 border-b border-slate-800 bg-[#1E293B] flex items-center px-4 gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-white">Raketech Admin</span>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
