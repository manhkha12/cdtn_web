// src/features/communication/hooks/useMessagingSocket.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../../../repository/api';
import type { Message, ServerToClientEvents, ClientToServerEvents } from '../types';

export const useMessagingSocket = (onNewMessage?: (msg: Message) => void) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  
  // Dùng Ref để tránh việc socket phải reconnect khi hàm onNewMessage thay đổi
  const onNewMessageRef = useRef(onNewMessage);
  
  useEffect(() => {
    onNewMessageRef.current = onNewMessage;
  }, [onNewMessage]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${API_BASE_URL}/messaging`, {
      auth: { token },
      transports: ['websocket', 'polling'], // Cho phép polling nếu websocket lỗi
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('authenticate' as any, { token: `Bearer ${localStorage.getItem('access_token')}` });
    });

    socket.on('newMessage', (message: Message) => {
      if (onNewMessageRef.current) onNewMessageRef.current(message);
    });

    socket.on('messageSent' as any, (message: Message) => {
      if (onNewMessageRef.current) onNewMessageRef.current(message);
    });

    socket.on('userOnline', (data: any) => {
      setOnlineUsers((prev) => new Set(prev).add(data.userId));
    });

    socket.on('userOffline', (data: any) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(data.userId);
        return next;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Chỉ chạy một lần khi mount

  const sendMessage = useCallback((conversationId: string, content: string, messageType: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT', mediaUrl?: string) => {
    if (socketRef.current) {
      socketRef.current.emit('sendMessage', { conversationId, content, messageType, mediaUrl });
    }
  }, []);

  const markAsRead = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('markAsRead' as any, { conversationId });
    }
  }, []);

  const joinConversation = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('joinConversation' as any, { conversationId });
    }
  }, []);

  const leaveConversation = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('leaveConversation' as any, { conversationId });
    }
  }, []);

  return {
    isConnected,
    onlineUsers,
    sendMessage,
    markAsRead,
    joinConversation,
    leaveConversation
  };
};
