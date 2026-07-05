import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
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
        rounded-xl
        px-5
        py-3
        font-medium
        transition-all
        duration-200
        bg-black
        text-white
        hover:bg-gray-800
        disabled:cursor-not-allowed
        disabled:opacity-50
        focus:outline-none
        focus:ring-2
        focus:ring-gray-300
        ${className}
      `}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}