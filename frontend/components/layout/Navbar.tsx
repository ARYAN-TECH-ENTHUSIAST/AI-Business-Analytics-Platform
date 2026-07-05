"use client";

interface Props {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({
  collapsed,
  toggleSidebar,
}: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center border-b bg-white px-8">

      <button
        onClick={toggleSidebar}
        className="mr-6 rounded-lg border p-2 transition hover:bg-gray-100"
      >
        {collapsed ? "☰" : "✕"}
      </button>

      <div>

        <h1 className="text-3xl font-bold">
          AI Business Intelligence
        </h1>

        <p className="text-gray-500">
          Business Intelligence & Analytics Platform
        </p>

      </div>

    </header>
  );
}