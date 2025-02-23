import { createClient } from '@/utils/supabase/server';

export const getPoolInfo = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('pools').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
