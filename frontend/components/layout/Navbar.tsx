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
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">

      <h2 className="text-xl font-semibold">
        {titles[pathname] ?? "AI Business Intelligence"}
      </h2>

      <button
        onClick={handleLogout}
        className="rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-100"
      >
        Logout
      </button>

    </header>
  );
}