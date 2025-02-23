import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const supabase = await createClient();
  const { data: list, error } = await supabase.rpc('get_nearby_pools', {
    latt: Number(lat),
    long: Number(lng),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: list || [] });
}
