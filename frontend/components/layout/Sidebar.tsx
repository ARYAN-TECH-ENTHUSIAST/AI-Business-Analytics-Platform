"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { logout } from "@/services/auth";

interface Props {
  collapsed: boolean;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    label: "Workspaces",
    href: "/workspaces",
    icon: "📁",
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
      className={`fixed left-0 top-0 flex h-screen flex-col border-r bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="border-b p-6">

        <h1 className="text-2xl font-bold">
          AI BI
        </h1>

        {!collapsed && (
          <p className="mt-2 text-sm text-gray-500">
            Business Intelligence Platform
          </p>
        )}

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {

          const active =
            pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">
                {item.icon}
              </span>

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </Link>
          );
        })}

      </nav>

      <div className="border-t p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-gray-100"
        >
          <span className="text-xl">
            🚪
          </span>

          {!collapsed && (
            <span>Logout</span>
          )}
        </button>

        {!collapsed && (
          <p className="mt-6 text-center text-xs text-gray-400">
            Version 1.0
          </p>
        )}

      </div>

    </aside>
  );
}