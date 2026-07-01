"use client";

import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
      >
        Logout
      </button>
    </header>
  );
}