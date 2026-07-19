import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const baseInputStyles = `
w-full
rounded-xl
border
bg-white
px-4
py-3
text-sm
text-slate-900
placeholder:text-slate-400
shadow-sm
transition-all
duration-200
outline-none
disabled:cursor-not-allowed
disabled:bg-slate-100
disabled:text-slate-400
disabled:border-slate-200
`;

const normalState =
  "border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

const errorState =
  "border-red-400 text-red-900 placeholder:text-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100";

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className={`
          ${baseInputStyles}
          ${error ? errorState : normalState}
          ${className}
        `}
      />

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}