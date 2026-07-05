import { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          transition
          outline-none

          ${
            error
              ? "border-red-400"
              : "border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200"
          }

          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}