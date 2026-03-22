import React from "react";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
