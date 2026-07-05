"use client";

import { ReactNode, useEffect } from "react";
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

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">

        <Sidebar />

        <div className="ml-64 flex min-h-screen flex-1 flex-col">

          <Navbar />

          <main className="flex-1">
            <div className="mx-auto w-full max-w-7xl px-8 py-8">
              {children}
            </div>
          </main>

        </div>

      </div>
    </div>
  );
}