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

        rounded-[18px]

        px-5
        py-3

        text-sm
        font-semibold

        text-white

        bg-emerald-700

        shadow-md

        transition-all
        duration-200

        hover:bg-emerald-800
        hover:-translate-y-0.5
        hover:shadow-lg

        active:translate-y-0
        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0
        disabled:hover:shadow-md

        focus:outline-none
        focus:ring-4
        focus:ring-emerald-100

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