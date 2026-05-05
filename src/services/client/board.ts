import { apiClient } from '../apiClient';
import { PostsPage } from '@/types/board';

export const fetchPostsPage = async (page: number) => {
  return apiClient<PostsPage>(`/api/board?page=${page}`);
};
