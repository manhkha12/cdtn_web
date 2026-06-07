import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";


export interface PostAuthor {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface PostMedia {
  id: string;
  file_url: string;
  file_type: string;
}

export const PostRecipientType = {
  ALL_STUDENTS: 'ALL_STUDENTS',
  SPECIFIC_CLASSES: 'SPECIFIC_CLASSES',
  BY_DEPARTMENT: 'BY_DEPARTMENT',
} as const;

export type PostRecipientType = typeof PostRecipientType[keyof typeof PostRecipientType];

export interface Post {
  id: string;
  title: string;
  content: string;
  recipient_type: PostRecipientType;
  status: string;
  course_class_id: string | null;
  course_class?: {
    id: string;
    subject_name: string | null;
  };
  author: PostAuthor;
  media: PostMedia[];
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  recipient_type: PostRecipientType;
  course_class_id?: string;
  recipient_ids?: string[];
  department_names?: string[];
  media_urls?: string[];
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  media_urls?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  skip?: number;
  take?: number;
  page?: number;
  limit?: number;
}

export const NotificationApi = {
  // New Posts API methods
  create: async (data: CreatePostDto): Promise<Post> => {
    const response = await apiClient.post(ENDPOINTS.POSTS.BASE, data);
    return response.data.data;
  },

  update: async (id: string, data: UpdatePostDto): Promise<Post> => {
    const response = await apiClient.patch(ENDPOINTS.POSTS.BY_ID(id), data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(ENDPOINTS.POSTS.BY_ID(id));
  },

  getMyPosts: async (skip: number = 0, take: number = 20): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get(ENDPOINTS.POSTS.MY_POSTS, {
      params: { skip, take }
    });
    return response.data.data;
  },
};
