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
        relative
        overflow-hidden

        rounded-3xl

        border
        border-white/70

        bg-white

        p-6

        shadow-[0_12px_40px_rgba(15,23,42,0.06)]

        transition-all
        duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-1
        hover:border-emerald-100
        hover:shadow-[0_20px_60px_rgba(16,24,40,0.10)]

        before:absolute
        before:inset-x-0
        before:top-0
        before:h-px
        before:bg-gradient-to-r
        before:from-transparent
        before:via-white
        before:to-transparent

        ${className}
      `}
    >
      {children}
    </div>
  );
}