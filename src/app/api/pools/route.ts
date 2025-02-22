import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: pools } = await supabase
      .from('pools')
      .select('latitude, longitude');

    return NextResponse.json(pools);
  } catch (e) {
    console.error(e);
  }
}
