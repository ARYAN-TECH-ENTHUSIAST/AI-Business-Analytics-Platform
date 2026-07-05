"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

      <div className="border-b border-gray-200 p-6">

        <h1 className="text-2xl font-bold">
          AI BI
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Business Intelligence Platform
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                active
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-gray-200 p-4 text-xs text-gray-400">
        Version 1.0
      </div>

    </aside>
  );
}