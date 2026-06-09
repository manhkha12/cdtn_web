// src/features/communication/pages/CommunicationPage.tsx
import React, { useState, useEffect } from "react";
import { ConversationList } from "../components/ConversationList";
import { ComposeAnnouncementForm } from "../components/ComposeAnnouncementForm";
import { ChatWindow } from "../components/ChatWindow";
import CommunicationTabs from "../components/CommunicationTabs";
import { MessagingApi } from "../../../repository/MessagingApi";
import type { Message, SearchUserResult } from "../types";
import type { CourseClass } from "../../../types";
import { LecturerApi } from "../../../repository/LecturerApi";
import { useSemester } from "../../../components/context/SemesterContext";
import { useMessaging } from "../../../components/context/MessagingContext";
import toast from "react-hot-toast";
import PageTitle from "../../../components/common/PageTitle";

export const CommunicationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [myClasses, setMyClasses] = useState<CourseClass[]>([]);
  const { selectedSemesterId } = useSemester();

  const { 
    conversations, 
    totalUnreadCount, 
    onlineUsers, 
    refreshConversations, 
    markAsRead, 
    sendMessage,
    joinConversation,
    leaveConversation
  } = useMessaging();

  // Room management and fetch messages when conversation selected
  useEffect(() => {
    if (selectedConvId) {
      joinConversation(selectedConvId);

      const fetchMessages = async () => {
        setIsLoadingMessages(true);
        try {
          const response = await MessagingApi.getMessages(selectedConvId);
          if (response && Array.isArray(response.messages)) {
            setMessages(response.messages);
            setHasMoreMessages(response.hasMore);
            setNextCursor(response.nextCursor);
          }
          markAsRead(selectedConvId);
        } catch (error) {
          console.error("Error fetching messages:", error);
          toast.error("Failed to load messages");
        } finally {
          setIsLoadingMessages(false);
        }
      };
      fetchMessages();

      return () => {
        leaveConversation(selectedConvId);
      };
    } else {
      setMessages([]);
    };
  }, [selectedConvId, markAsRead, joinConversation, leaveConversation]);

  useEffect(() => {
    if (!selectedSemesterId) return;

    const fetchClasses = async () => {
      try {
        const classes = await LecturerApi.getMyClasses(selectedSemesterId);
        setMyClasses(classes);
      } catch (error) {
        console.error("Failed to fetch classes", error);
      }
    };
    fetchClasses();
  }, [selectedSemesterId]);

  // Listen for new messages to update the current chat view
  const selectedConversation = conversations.find(c => String(c.id) === String(selectedConvId));

  useEffect(() => {
    if (selectedConversation?.lastMessage) {
      const lastMsg = selectedConversation.lastMessage;
      setMessages(prev => {
        // Tránh trùng lặp tin nhắn
        if (prev.some(m => m.id === lastMsg.id)) return prev;
        // Kiểm tra xem tin nhắn có thuộc hội thoại hiện tại không
        if (String(lastMsg.conversationId) !== String(selectedConvId)) return prev;
        return [...prev, lastMsg];
      });
    }
  }, [selectedConversation?.lastMessage, selectedConvId]);

  const handleSendMessage = (content: string, type: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT', url?: string) => {
    if (selectedConvId) {
      sendMessage(selectedConvId, content, type, url);
    }
  };

  const handleStartNewChat = async (user: SearchUserResult) => {
    try {
      const conv = await MessagingApi.getOrCreateConversation(user.id);
      await refreshConversations();
      setSelectedConvId(conv.id);
      setActiveTab("messages");
    } catch (error) {
      toast.error("Failed to start conversation");
    }
  };

  const handleLoadMore = async () => {
    if (!selectedConvId || isLoadingMessages || !hasMoreMessages || !nextCursor) return;
    
    try {
      const response = await MessagingApi.getMessages(selectedConvId, 50, nextCursor ?? undefined);
      if (response && Array.isArray(response.messages) && response.messages.length > 0) {
        setMessages((prev) => [...response.messages, ...prev]);
        setHasMoreMessages(response.hasMore);
        setNextCursor(response.nextCursor);
      } else {
        setHasMoreMessages(false);
      }
    } catch (error) {
      console.error("Load more error:", error);
    }
  };

  return (
    <div className="p-6 bg-[#f4f6f9] min-h-screen">
      <PageTitle title="Hộp thư & Thông báo" className="mb-4" />
      <CommunicationTabs 
        activeTab={activeTab} 
        onChange={setActiveTab} 
        totalUnreadCount={totalUnreadCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ConversationList 
            conversations={conversations}
            selectedId={selectedConvId}
            onSelect={setSelectedConvId}
            onStartNewChat={handleStartNewChat}
            onlineUsers={onlineUsers}
          />
        </div>

        <div className="lg:col-span-2">
          {activeTab === 'announcement' ? (
            <ComposeAnnouncementForm classes={myClasses} /> 
          ) : (
            selectedConvId && selectedConversation ? (
              <ChatWindow 
                conversationId={selectedConvId}
                partner={selectedConversation.partner}
                messages={messages}
                isOnline={onlineUsers.has(selectedConversation.partner.id)}
                onSendMessage={handleSendMessage}
                onLoadMore={handleLoadMore}
                hasMore={hasMoreMessages}
                isLoadingMessages={isLoadingMessages}
              />
            ) : (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl h-[80vh] flex flex-col items-center justify-center text-slate-400">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="font-bold text-slate-600">Bắt đầu trò chuyện</p>
                <p className="text-sm">Chọn một hội thoại hoặc tìm kiếm sinh viên để bắt đầu</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;