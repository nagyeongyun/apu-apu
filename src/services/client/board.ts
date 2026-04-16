import { apiClient } from '../apiClient';
import { WritePostFormValues } from '@/types/board';

export const createPost = async (payload: WritePostFormValues) => {
  return apiClient<{ message: string }>('/api/board', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
