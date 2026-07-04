"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Workspaces",
    href: "/workspaces",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">

      <div className="border-b p-6">

        <h1 className="text-xl font-bold">
          AI BI Platform
        </h1>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {

          const active =
            pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}