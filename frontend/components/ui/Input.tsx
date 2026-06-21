"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          border
          rounded-md
          px-3
          py-2
          w-full
          outline-none
          focus:ring
          ${className}
        `}
      />
    </div>
  );
}