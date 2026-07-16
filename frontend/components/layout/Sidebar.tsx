"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Sparkles,
} from "lucide-react";

import { logout } from "@/services/auth";

interface Props {
  collapsed: boolean;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Workspaces",
    href: "/workspaces",
    icon: FolderKanban,
  },
];

export default function Sidebar({
  collapsed,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        flex
        h-screen
        flex-col
        border-r
        border-slate-200/80
        bg-[#fbfcfb]/95
        backdrop-blur-xl
        transition-[width]
        duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* Logo */}

      <div className="border-b border-slate-200/70 px-5 py-7">

        <div className="flex items-center">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 shadow-lg shadow-emerald-700/20">
            <Sparkles
              size={22}
              className="text-white"
            />
          </div>

          <div
            className={`
              ml-4
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"}
            `}
          >
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              AI BI
            </h1>

            <p className="text-sm text-slate-500">
              Analytics Platform
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-3 py-6">

        {menuItems.map((item) => {

          const active = pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex
                items-center
                rounded-2xl
                px-4
                py-3.5
                transition-all
                duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  active
                    ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }
              `}
            >
              <Icon
                size={20}
                className="shrink-0"
              />

              <div
                className={`
                  ml-3
                  overflow-hidden
                  whitespace-nowrap
                  transition-all
                  duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${collapsed ? "w-0 opacity-0" : "w-32 opacity-100"}
                `}
              >
                <span className="font-medium">
                  {item.label}
                </span>
              </div>

            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200/70 p-3">

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            rounded-2xl
            px-4
            py-3
            text-slate-600
            transition-all
            duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <LogOut
            size={20}
            className="shrink-0"
          />

          <div
            className={`
              ml-3
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${collapsed ? "w-0 opacity-0" : "w-24 opacity-100"}
            `}
          >
            <span className="font-medium">
              Logout
            </span>
          </div>

        </button>

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${collapsed ? "max-h-0 opacity-0" : "mt-6 max-h-10 opacity-100"}
          `}
        >
          <p className="text-center text-xs tracking-wide text-slate-400">
            Version 1.0
          </p>
        </div>

      </div>

    </aside>
  );
}