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
      className={`fixed left-0 top-0 flex h-screen flex-col border-r border-slate-200 bg-[#fbfcfb] transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo */}

      <div className="border-b border-slate-200 px-6 py-7">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 shadow-md">
            <Sparkles
              size={22}
              className="text-white"
            />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                AI BI
              </h1>

              <p className="text-sm text-slate-500">
                Analytics Platform
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-4 py-6">

        {menuItems.map((item) => {

          const active =
            pathname.startsWith(item.href);

          const Icon =
            item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex
                items-center
                gap-3

                rounded-2xl

                px-4
                py-3.5

                text-[15px]
                font-medium

                transition-all
                duration-200

                ${
                  active
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }
              `}
            >
              <Icon
                size={20}
              />

              {!collapsed && (
                <span>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            size={20}
          />

          {!collapsed && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>

        {!collapsed && (
          <p className="mt-6 text-center text-xs tracking-wide text-slate-400">
            Version 1.0
          </p>
        )}

      </div>

    </aside>
  );
}