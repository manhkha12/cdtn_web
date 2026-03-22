import React from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
}) => {
  const baseStyles = "bg-white rounded-lg";
  const variants = {
    default: "border border-gray-200 shadow-sm",
    elevated: "shadow-md border border-gray-100",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)}>
      {children}
    </div>
  );
};

export default Card;
