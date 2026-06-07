// src/features/communication/components/RecentInquiries.tsx
import React from "react";

interface Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const RecentInquiries: React.FC<Props> = ({ selectedId, onSelect }) => {
  const inquiries = [
    { id: 1, name: "Alex Johnson", time: "12:45 PM", text: "Hello Professor, I have a question regarding the...", unread: 2, online: true },
    { id: 2, name: "Sarah Williams", time: "10:20 AM", text: "Thank you for the feedback on my design docum...", unread: 0, online: false },
    { id: 3, name: "David Chen", time: "Yesterday", text: "Is the lecture on Friday going to be recorded?", unread: 0, online: false },
  ];

  const handleInquiryClick = (id: number) => {
    onSelect(id);       // Cập nhật ID sinh viên đang chat
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-extrabold text-slate-800 tracking-tight">Recent Inquiries</h3>
        <button className="text-red-600 text-xs font-bold hover:underline">View All</button>
      </div>
      <div className="space-y-2">
        {inquiries.map((iq) => (
          <div 
            key={iq.id} 
            onClick={() => handleInquiryClick(iq.id)}
            className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-colors ${
              selectedId === iq.id ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'hover:bg-slate-50'
            }`}
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden border">
                <img src={`https://i.pravatar.cc/150?u=${iq.id}`} alt="" />
              </div>
              {iq.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <span className={`font-bold text-sm ${selectedId === iq.id ? 'text-[#1e3a8a]' : 'text-slate-800'}`}>{iq.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{iq.time}</span>
              </div>
              <p className={`text-xs truncate ${selectedId === iq.id ? 'text-blue-700 font-medium' : 'text-slate-500'}`}>{iq.text}</p>
            </div>
            {iq.unread > 0 && selectedId !== iq.id && (
              <span className="bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center self-center flex-shrink-0">{iq.unread}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};