"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PanelLeftClose } from "lucide-react";

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
    <div className="relative flex min-h-screen bg-gray-50">

      <Sidebar collapsed={collapsed} />

      {/* Floating Sidebar Toggle */}

      <button
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label="Toggle Sidebar"
        className={`
          fixed
          top-10
          z-50

          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-full

          border
          border-slate-200

          bg-white

          shadow-lg

          transition-all
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          hover:scale-105
          hover:border-emerald-300
          hover:shadow-xl
        `}
        style={{
          left: collapsed ? "70px" : "256px",
        }}
      >
        <PanelLeftClose
          size={19}
          className={`
            transition-transform
            duration-300
            ${collapsed ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          flex
          flex-1
          flex-col
          transition-[margin]
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${collapsed ? "ml-20" : "ml-72"}
        `}
      >
        <Navbar />

        <main className="mx-auto w-full max-w-7xl flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}