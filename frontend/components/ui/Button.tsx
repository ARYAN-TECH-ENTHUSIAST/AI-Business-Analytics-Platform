import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        px-5
        py-3

        text-sm
        font-semibold
        tracking-wide

        text-white

        bg-gradient-to-r
        from-emerald-600
        via-emerald-600
        to-teal-600

        shadow-[0_10px_24px_rgba(5,150,105,0.25)]

        transition-all
        duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-[0_18px_38px_rgba(5,150,105,0.35)]
        hover:from-emerald-500
        hover:to-teal-500

        active:translate-y-0
        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0
        disabled:hover:scale-100
        disabled:hover:shadow-[0_10px_24px_rgba(5,150,105,0.25)]

        focus:outline-none
        focus:ring-4
        focus:ring-emerald-200

        ${className}
      `}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}