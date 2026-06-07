// src/features/communication/components/ChatWindow.tsx
import React, { useState, useEffect, useRef } from "react";
import { 
  Phone, Video, Info, Image, 
  Smile, Send, FileText, User as UserIcon,
  Paperclip
} from "lucide-react";
import type { Message, User } from "../types";
    
interface Props {
  conversationId: string;
  partner: User;
  messages: Message[];
  isOnline: boolean;
  onSendMessage: (content: string, type?: 'TEXT' | 'IMAGE' | 'FILE', url?: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMessages?: boolean;
}

export const ChatWindow: React.FC<Props> = ({ 
  partner, 
  messages, 
  isOnline, 
  onSendMessage,
  onLoadMore,
  hasMore,
  isLoadingMessages
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : null;

  useEffect(() => {
    scrollToBottom();
  }, [lastMessageId]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      if (scrollTop === 0 && hasMore && !isLoadingMessages && onLoadMore) {
        onLoadMore();
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-[80vh] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center flex-shrink-0 bg-white z-10">
        <div className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded-xl transition-colors">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-200 rounded-full border border-slate-100 flex items-center justify-center overflow-hidden">
              {partner.avatar ? (
                <img src={partner.avatar} alt={partner.fullName} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={20} className="text-slate-400" />
              )}
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight">
              {partner.fullName}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {partner.code} {partner.subtitle && `• ${partner.subtitle}`}
              </p>
              <span className={`text-[10px] font-bold ${isOnline ? 'text-green-600' : 'text-slate-400'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          {[Phone, Video, Info].map((Icon, i) => (
            <button key={i} className="p-2.5 rounded-full hover:bg-slate-100 transition-colors">
              <Icon size={20} className="text-[#1e3a8a]" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50/50 custom-scrollbar"
      >
        {isLoadingMessages && (
          <div className="text-center text-xs text-slate-400 py-2">Loading messages...</div>
        )}
        
        {messages.map((msg, index) => {
          const isFaculty = msg.senderId !== partner.id;
          const showDate = index === 0 || 
            new Date(messages[index-1].createdAt).toDateString() !== new Date(msg.createdAt).toDateString();

          return (
            <React.Fragment key={msg.id}>
              {showDate && (
                <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-4">
                  {new Date(msg.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', day: 'numeric', year: 'numeric' 
                  })}
                </div>
              )}
              <div className={`flex gap-3 ${isFaculty ? 'justify-end' : ''}`}>
                {!isFaculty && (
                  <div className="w-8 h-8 bg-slate-200 rounded-full self-end flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                    {partner.avatar ? (
                      <img src={partner.avatar} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <UserIcon size={16} className="text-slate-400" />
                    )}
                  </div>
                )}
                <div className={`flex flex-col ${isFaculty ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                    isFaculty 
                      ? 'bg-[#1e3a8a] text-white rounded-br-none' 
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                  }`}>
                    {msg.messageType === 'FILE' ? (
                      <a 
                        href={msg.mediaUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:underline"
                      >
                        <FileText size={18} />
                        <span className="font-medium">{msg.content}</span>
                      </a>
                    ) : msg.messageType === 'IMAGE' ? (
                      <img src={msg.mediaUrl} alt="attachment" className="rounded-lg max-w-full" />
                    ) : (
                      msg.content
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 font-medium px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-white flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
           <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
              <Paperclip size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
              <Image size={18} />
            </button>
          </div>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full py-2.5 pl-4 pr-10 bg-slate-100 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
              <Smile size={18} />
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`p-2.5 rounded-full transition-all ${
              inputValue.trim() 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};