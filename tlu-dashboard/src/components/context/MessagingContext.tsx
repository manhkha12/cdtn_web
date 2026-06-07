import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Conversation, Message } from '../../features/communication/types';
import { MessagingApi } from '../../repository/MessagingApi';
import { useMessagingSocket } from '../../features/communication/hooks/useMessagingSocket';

interface MessagingContextType {
  conversations: Conversation[];
  totalUnreadCount: number;
  onlineUsers: Set<string>;
  refreshConversations: () => Promise<void>;
  markAsRead: (conversationId: string) => void;
  sendMessage: (conversationId: string, content: string, type?: any, url?: string) => void;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const MessagingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const fetchConversations = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return; // Không gọi API nếu chưa có token

    try {
      const data = await MessagingApi.getConversations();
      if (data) {
        setConversations(data);
      }
    } catch (error) {
      console.error('Failed to fetch conversations', error);
    }
  }, []);

  const handleNewMessage = useCallback((msg: Message) => {
    setConversations((prev) => {
      const convIndex = prev.findIndex((c) => String(c.id) === String(msg.conversationId));
      if (convIndex > -1) {
        const updatedConv = {
          ...prev[convIndex],
          lastMessage: msg,
          unreadCount: (prev[convIndex].unreadCount || 0) + 1,
          updatedAt: msg.createdAt,
        };
        const others = prev.filter((_, i) => i !== convIndex);
        return [updatedConv, ...others];
      }
      fetchConversations();
      return prev;
    });
  }, [fetchConversations]);

  const { onlineUsers, sendMessage, markAsRead, joinConversation, leaveConversation } = useMessagingSocket(handleNewMessage);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);

  const markAsReadWithState = useCallback((conversationId: string) => {
    markAsRead(conversationId);
    setConversations(prev => prev.map(c => 
      String(c.id) === String(conversationId) ? { ...c, unreadCount: 0 } : c
    ));
  }, [markAsRead]);

  return (
    <MessagingContext.Provider value={{
      conversations,
      totalUnreadCount,
      onlineUsers,
      refreshConversations: fetchConversations,
      markAsRead: markAsReadWithState,
      sendMessage,
      joinConversation,
      leaveConversation
    }}>
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};
