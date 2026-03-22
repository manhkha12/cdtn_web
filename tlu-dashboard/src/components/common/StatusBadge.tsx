import React from "react";

type StatusVariant = "present" | "absent" | "late" | "active" | "inactive";

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  present: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  absent: "bg-red-50 text-red-700 border border-red-200",
  late: "bg-amber-50 text-amber-700 border border-amber-200",
  active: "bg-blue-50 text-blue-700 border border-blue-200",
  inactive: "bg-slate-100 text-slate-600 border border-slate-200",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  children,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
