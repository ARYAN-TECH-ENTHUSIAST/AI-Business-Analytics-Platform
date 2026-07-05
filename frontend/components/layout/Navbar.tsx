"use client";

import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/services/auth";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/workspaces": "Workspaces",
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {titles[pathname] ?? "AI Business Intelligence"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Business Intelligence & Analytics Platform
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium transition hover:bg-gray-100"
        >
          Logout
        </button>

      </div>

    </header>
  );
}