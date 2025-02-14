import Script from 'next/script';
import Nav from '@/components/layout/Nav';
import Map from '@/components/main/Map';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: coordinates, error } = await supabase
    .from('pools')
    .select('latitude, longitude');

  if (error) {
    console.error('Error fetching coordinates:', error.message);
  }

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}&submodules=geocoder`}
      />
      <main className="my-[1.3rem]">
        <Nav />
        <div className="mx-[20rem] mt-8 border border-gray-200">
          <Map coordinates={coordinates || []} />
        </div>
      </main>
    </>
  );
}
