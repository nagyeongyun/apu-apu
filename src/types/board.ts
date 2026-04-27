import { Database } from './supabase';
import { z } from 'zod';

type PostRow = Database['public']['Tables']['posts']['Row'];

export type PostInfo = Pick<PostRow, 'id' | 'name' | 'content' | 'created_at'>;

export interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

export const writePostSchema = z.object({
  name: z.string().trim().min(1, '닉네임을 입력해주세요.'),
  password: z
    .string()
    .trim()
    .min(1, '비밀번호를 입력해주세요.')
    .min(4, '4자 이상 입력해주세요.'),
  content: z.string().trim().min(1, '내용을 입력해주세요.'),
});

export type WritePostFormValues = z.infer<typeof writePostSchema>;
