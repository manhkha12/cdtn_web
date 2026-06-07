import React from "react";

type StatusVariant = "present" | "absent" | "late" | "active" | "inactive" | "ai_verified";

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  present: "bg-emerald-50 text-emerald-700 border-emerald-100",
  absent: "bg-red-50 text-red-700 border-red-100",
  late: "bg-amber-50 text-amber-700 border-amber-100",
  active: "bg-blue-50 text-blue-700 border-blue-100",
  inactive: "bg-slate-100 text-slate-600 border-slate-200",
  ai_verified: "bg-indigo-50 text-indigo-700 border-indigo-100 shadow-sm",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ variant, children, className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] uppercase font-black tracking-widest ${variantStyles[variant]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current ${variant === 'ai_verified' ? 'animate-pulse' : ''}`}></span>
      {children}
    </span>
  );
};

export default StatusBadge;