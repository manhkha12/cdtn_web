// src/features/dashboard/components/ChatPreview.tsx
import React from "react";
import Card from "../../../components/common/Card";
import { MessageSquare, ArrowUpRight } from "lucide-react";

const recentChats = [
  { id: 1, name: "Alex Johnson", msg: "Hello Prof, about Assignment 3...", time: "12:45", unread: 2 },
  { id: 2, name: "Sarah Williams", msg: "Thank you for the feedback!", time: "10:20", unread: 0 },
];

export const ChatPreview: React.FC = () => {
  return (
    <Card className="border-0 shadow-sm p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <MessageSquare size={18} />
          </div>
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Student Chat</h3>
        </div>
        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {recentChats.map((chat) => (
          <div key={chat.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex-shrink-0 flex items-center justify-center font-bold text-xs text-slate-500">
              {chat.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="font-bold text-slate-800 text-xs truncate">{chat.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{chat.time}</p>
              </div>
              <p className="text-[11px] text-slate-500 truncate group-hover:text-slate-700">{chat.msg}</p>
            </div>
            {chat.unread > 0 && (
              <span className="w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {chat.unread}
              </span>
            )}
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-[11px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 hover:text-blue-600 transition-colors">
        Open Chat Portal
      </button>
    </Card>
  );
};

export default ChatPreview;