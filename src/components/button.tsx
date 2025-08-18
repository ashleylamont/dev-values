import type { ReactNode } from "react";

const COLORS = {
  purple: {
    outer: "text-purple-600",
    inner: "bg-purple-600",
  },
  lightBlue: {
    outer: "text-blue-500",
    inner: "bg-blue-500",
  },
  deepBlue: {
    outer: "text-blue-800",
    inner: "bg-blue-800",
  },
  neutral: {
    outer: "text-gray-800",
    inner: "bg-gray-800",
  },
  lightRed: {
    outer: "text-red-500",
    inner: "bg-red-500",
  },
  deepRed: {
    outer: "text-red-800",
    inner: "bg-red-800",
  },
} as const;

export interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  color?: keyof typeof COLORS;
}

export function Button(props: ButtonProps) {
  const { onClick, children, color = "purple" } = props;

  const className = COLORS[color].outer;
  const shadowClassName = COLORS[color].inner;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full group relative inline-block text-sm font-medium ${className} focus:ring-3 focus:outline-hidden cursor-pointer ${className}`}
    >
      <span
        className={`absolute inset-0 translate-x-0.5 translate-y-0.5 ${shadowClassName} transition-transform group-hover:translate-x-0 group-hover:translate-y-0 ${shadowClassName}`}
      ></span>
      <span className="relative block border border-current bg-white px-8 py-3">
        {children}
      </span>
    </button>
  );
}
