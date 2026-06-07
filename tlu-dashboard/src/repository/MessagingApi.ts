// src/repository/MessagingApi.ts
import apiClient from './apiClient';
import { ENDPOINTS } from './api';
import type { Conversation, SearchUserResult, MessageListResponse } from '../features/communication/types';

export const MessagingApi = {
  getConversations: async (): Promise<Conversation[]> => {
    const response = await apiClient.get(ENDPOINTS.MESSAGING.CONVERSATIONS);
    return response.data.data;
  },

  getMessages: async (conversationId: string, limit: number = 50, cursor?: string): Promise<MessageListResponse> => {
    console.log(`[MessagingApi] Fetching messages for conv: ${conversationId}, cursor: ${cursor}`);
    const response = await apiClient.get(`${ENDPOINTS.MESSAGING.CONVERSATIONS}/${conversationId}/messages`, {
      params: { limit, cursor }
    });
    console.log(`[MessagingApi] Messages received:`, response.data.data);
    return response.data.data;
  },

  searchUsers: async (query: string): Promise<SearchUserResult[]> => {
    const response = await apiClient.get(ENDPOINTS.MESSAGING.SEARCH_USERS, {
      params: { q: query }
    });
    return response.data.data;
  },

  getOrCreateConversation: async (targetUserId: string): Promise<Conversation> => {
    const response = await apiClient.post(ENDPOINTS.MESSAGING.CONVERSATIONS, {
      targetUserId
    });
    return response.data.data;
  }
};
