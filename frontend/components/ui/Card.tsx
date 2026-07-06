import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-[20px]
        border
        border-slate-200
        bg-white

        p-6

        shadow-[0_8px_30px_rgba(15,23,42,0.05)]

        transition-all
        duration-200

        hover:-translate-y-1
        hover:border-emerald-200
        hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]

        ${className}
      `}
    >
      {children}
    </div>
  );
}