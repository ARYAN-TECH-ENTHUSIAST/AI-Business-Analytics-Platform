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
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">

      <Sidebar collapsed={collapsed} />

      {/* Floating Sidebar Toggle */}

      <button
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label="Toggle Sidebar"
        className={`
          glass
          soft-shadow

          fixed
          top-10
          z-50

          flex
          h-11
          w-5
          items-center
          justify-center

          rounded-r-full

          border
          border-l-0
          border-emerald-100/80

          bg-white/90

          transition-all
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          hover:w-6
          hover:bg-emerald-50

          active:scale-95
        `}
        style={{
          left: collapsed ? "92px" : "286px",
        }}
      >
        <PanelLeftClose
          size={14}
          strokeWidth={2.5}
          className={`
            text-slate-600
            transition-transform
            duration-300
            ${collapsed ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          flex
          min-h-screen
          flex-col
          transition-[margin]
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${collapsed ? "ml-28" : "ml-80"}
        `}
      >
        <Navbar />

        <main className="mx-auto w-full max-w-[1500px] flex-1 px-8 pb-8 pt-6">
          {children}
        </main>

      </div>

    </div>
  );
}