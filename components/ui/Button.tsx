"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-md bg-blue-500 text-white font-light shadow-md",
        "hover:bg-blue-600 hover:shadow-lg",
        "active:scale-95 transition-transform duration-150 ease-in-out",
        className
      )}
    >
      {children}
    </button>
  );
}
