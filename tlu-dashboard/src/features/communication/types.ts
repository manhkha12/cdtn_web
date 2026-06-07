// src/features/communication/types.ts

export type UserRole = 'STUDENT' | 'LECTURER' | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  code: string;
  subtitle?: string;
  avatar?: string;
  role: UserRole;
  isOnline?: boolean;
}

export type MessageType = 'TEXT' | 'IMAGE' | 'FILE';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  mediaUrl?: string;
  createdAt: string;
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  partner: User;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface MessageListResponse {
  messages: Message[];
  hasMore: boolean;
  nextCursor: string | null;
}

export interface SearchUserResult extends User {}

// Socket event types
export interface ServerToClientEvents {
  newMessage: (message: Message) => void;
  userOnline: (userId: string) => void;
  userOffline: (userId: string) => void;
  messagesRead: (data: { conversationId: string; readerId: string }) => void;
}

export interface ClientToServerEvents {
  sendMessage: (data: { conversationId: string; content: string; messageType: MessageType; mediaUrl?: string }) => void;
  readMessages: (conversationId: string) => void;
}
