import React from "react";
import { ChevronRight } from "lucide-react";

interface PageTitleProps {
  title: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <div className="w-7 h-7 rounded-full bg-[#0056b3] flex items-center justify-center text-white shadow-sm flex-shrink-0">
        <ChevronRight size={16} strokeWidth={3.5} />
      </div>
      <h1 className="text-[#800000] font-black text-lg md:text-xl tracking-wider uppercase">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
