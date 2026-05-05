import { createClient } from '@/utils/supabase/server';
import { PostsPage } from '@/types/board';

const POSTS_PAGE_SIZE = 12;

export const getPostsPage = async (page: number = 1): Promise<PostsPage> => {
  const supabase = await createClient();

  const from = (page - 1) * POSTS_PAGE_SIZE;
  const to = from + POSTS_PAGE_SIZE;

  const { data, error } = await supabase
    .from('posts')
    .select('id, name, content, created_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const hasNextPage = (data?.length ?? 0) > POSTS_PAGE_SIZE;

  return {
    posts: hasNextPage ? data.slice(0, POSTS_PAGE_SIZE) : (data ?? []),
    nextPage: hasNextPage ? page + 1 : null,
  };
};
