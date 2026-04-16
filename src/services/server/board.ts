import { createClient } from '@/utils/supabase/server';

export const getPosts = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id, name, content, created_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
