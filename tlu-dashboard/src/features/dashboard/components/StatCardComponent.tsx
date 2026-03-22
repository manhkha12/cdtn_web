import React from "react";
import Card from "../../../components/common/Card";
import type { StatCard } from "../../../types";

interface StatCardComponentProps extends StatCard {}

export const StatCardComponent: React.FC<StatCardComponentProps> = ({
  icon: IconComponent,
  iconSize,
  label,
  value,
  description,
  color,
}) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">
            {label}
          </p>
          <p className="text-4xl font-bold text-slate-950 mb-2 tracking-tight">
            {value}
          </p>
          <p className="text-xs text-slate-400 font-medium">{description}</p>
        </div>
        <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>
          <IconComponent size={iconSize} />
        </div>
      </div>
    </Card>
  );
};

export default StatCardComponent;
