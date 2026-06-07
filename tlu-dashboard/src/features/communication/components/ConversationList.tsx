// src/features/communication/components/ConversationList.tsx
import React from "react";
import { User as UserIcon } from "lucide-react";
import type { Conversation, SearchUserResult } from "../types";
import { SearchStudent } from "./SearchStudent";

interface Props {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onStartNewChat: (user: SearchUserResult) => void;
  onlineUsers: Set<string>;
}

export const ConversationList: React.FC<Props> = ({ 
  conversations, 
  selectedId, 
  onSelect, 
  onStartNewChat,
  onlineUsers 
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl flex flex-col h-[80vh] overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex-shrink-0">
        <h3 className="font-extrabold text-slate-800 tracking-tight mb-4 text-lg">Messages</h3>
        <SearchStudent onSelectUser={onStartNewChat} />
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <p className="text-sm font-medium">No conversations yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {conversations.map((conv) => {
              const isSelected = selectedId === conv.id;
              const isOnline = onlineUsers.has(conv.partner.id);
              
              return (
                <div 
                  key={conv.id} 
                  onClick={() => onSelect(conv.id)}
                  className={`flex gap-3 p-4 cursor-pointer transition-all hover:bg-slate-50 border-l-4 ${
                    isSelected ? 'bg-blue-50/50 border-blue-600' : 'border-transparent'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden border border-slate-100 shadow-sm flex items-center justify-center">
                      {conv.partner.avatar ? (
                        <img src={conv.partner.avatar} alt={conv.partner.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={20} className="text-slate-400" />
                      )}
                    </div>
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <span className={`font-bold text-sm truncate ${isSelected ? 'text-[#1e3a8a]' : 'text-slate-900'}`}>
                        {conv.partner.fullName}
                      </span>
                      {conv.lastMessage && (
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                          {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        {conv.partner.code} {conv.partner.subtitle && `• ${conv.partner.subtitle}`}
                      </p>
                      <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                        {conv.lastMessage?.content || "No messages yet"}
                      </p>
                    </div>
                  </div>
                  
                  {conv.unreadCount > 0 && !isSelected && (
                    <span className="bg-red-600 text-white text-[10px] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center self-center flex-shrink-0 px-1.5 shadow-sm shadow-red-200">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
