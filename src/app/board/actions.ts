'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { writePostSchema, WritePostFormValues } from '@/types/board';

type CreatePostActionResult = {
  success: boolean;
  error?: string;
};

type DeletePostActionResult = {
  success: boolean;
  error?: string;
};

export async function createPostAction(
  payload: WritePostFormValues,
): Promise<CreatePostActionResult> {
  try {
    const trimmedData = {
      name: payload.name?.trim(),
      password: payload.password?.trim(),
      content: payload.content?.trim(),
    };

    const parsed = writePostSchema.safeParse(trimmedData);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || '입력값을 확인해주세요.',
      };
    }

    const { name, password, content } = parsed.data;

    const passwordHash = await bcrypt.hash(password, 10);

    const supabase = await createClient();

    const { error } = await supabase.from('posts').insert({
      name,
      content,
      password_hash: passwordHash,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath('/board');

    return { success: true };
  } catch {
    return {
      success: false,
      error: '오류가 발생했습니다.',
    };
  }
}

export async function deletePostAction(
  postId: string,
  password: string,
): Promise<DeletePostActionResult> {
  try {
    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      return { success: false, error: '비밀번호를 입력해주세요.' };
    }

    const supabase = await createClient();

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('id, password_hash')
      .eq('id', postId)
      .is('deleted_at', null)
      .single();

    if (fetchError || !post) {
      return { success: false, error: '게시글을 찾을 수 없습니다.' };
    }

    const isMatched = await bcrypt.compare(trimmedPassword, post.password_hash);

    if (!isMatched) {
      return { success: false, error: '비밀번호가 일치하지 않습니다.' };
    }

    const { error: deleteError } = await supabase
      .from('posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', postId);

    if (deleteError) {
      return { success: false, error: '게시글 삭제에 실패했습니다.' };
    }

    revalidatePath('/board');

    return { success: true };
  } catch {
    return { success: false, error: '오류가 발생했습니다.' };
  }
}
