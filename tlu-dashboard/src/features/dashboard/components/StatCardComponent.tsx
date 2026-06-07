import React from "react";
import Card from "../../../components/common/Card";
import type { StatCard } from "../../../types";

interface StatCardComponentProps extends StatCard {
  onClick?: () => void;
}

export const StatCardComponent: React.FC<StatCardComponentProps> = ({
  icon: IconComponent,
  iconSize,
  label,
  value,
  description,
  color,
  onClick,
}) => {
  return (
    <Card 
      onClick={onClick} 
      // Thêm padding p-6 và hiệu ứng nâng lên khi hover
      className={`border-0 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 ${onClick ? 'bg-white' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-3">
            {label}
          </p>
          <p className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
            {value}
          </p>
          <p className="text-[11px] text-slate-400 font-bold opacity-80 uppercase tracking-tight">
            {description}
          </p>
        </div>
        
        {/* Phần icon container */}
        <div className={`p-3.5 rounded-2xl ${color} flex-shrink-0 shadow-sm flex items-center justify-center`}>
          <IconComponent size={iconSize} strokeWidth={2.5} />
        </div>
      </div>
    </Card>
  );
};

export default StatCardComponent;