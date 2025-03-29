import React, { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({ className = "", children, ...props }) => {
  return (
    <select
      className={`block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                  text-base px-3 py-2 transition-all ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
