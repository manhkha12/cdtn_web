// src/features/communication/components/CommunicationTabs.tsx
import React from "react";
import { Megaphone, MessageSquare } from "lucide-react";

interface CommunicationTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  totalUnreadCount: number;
}

export const CommunicationTabs: React.FC<CommunicationTabsProps> = ({ 
  activeTab, 
  onChange,
  totalUnreadCount
}) => {
  return (
    <div className="flex border-b border-slate-200 mb-8">
      <button 
        onClick={() => onChange('announcement')}
        className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
          activeTab === 'announcement' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-400'
        }`}
      >
        <Megaphone size={18} /> Send Announcement
      </button>
      <button 
        onClick={() => onChange('messages')}
        className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-2 relative ${
          activeTab === 'messages' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-400'
        }`}
      >
        <MessageSquare size={18} /> Messages
        {totalUnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-bounce">
            {totalUnreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CommunicationTabs; // Export default để khớp với file CommunicationPage