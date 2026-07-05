"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { isAuthenticated } from "@/services/auth";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar
        collapsed={collapsed}
      />

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Navbar
          collapsed={collapsed}
          toggleSidebar={() =>
            setCollapsed((prev) => !prev)
          }
        />

        <main className="mx-auto w-full max-w-7xl flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}