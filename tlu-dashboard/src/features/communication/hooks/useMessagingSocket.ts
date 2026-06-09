// src/features/communication/hooks/useMessagingSocket.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import type { Socket } from 'socket.io-client';
import { useSocket } from '../../../components/context/SocketContext';
import type { Message, ServerToClientEvents, ClientToServerEvents } from '../types';

export const useMessagingSocket = (onNewMessage?: (msg: Message) => void) => {
  const { getSocket } = useSocket();
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  
  // Dùng Ref để tránh việc socket phải reconnect khi hàm onNewMessage thay đổi
  const onNewMessageRef = useRef(onNewMessage);
  
  useEffect(() => {
    onNewMessageRef.current = onNewMessage;
  }, [onNewMessage]);

  useEffect(() => {
    const socket = getSocket('/messaging') as Socket<ServerToClientEvents, ClientToServerEvents>;
    socketRef.current = socket;

    if (socket.connected) {
      setIsConnected(true);
    }

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
      socket.off('connect');
      socket.off('newMessage');
      socket.off('messageSent' as any);
      socket.off('userOnline');
      socket.off('userOffline');
    };
  }, [getSocket]); // Chỉ chạy một lần khi mount

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
