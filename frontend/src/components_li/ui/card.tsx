import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-300 bg-white shadow-md hover:shadow-lg transition-all p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
