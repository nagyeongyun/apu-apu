import Script from 'next/script';
import Nav from '@/components/layout/Nav';
import Map from '@/components/main/Map';
import { PoolInfo } from '@/types/pool';
import { getPoolInfo } from '@/services/server/map';

export default async function Home() {
  let pools: PoolInfo[] = [];

  try {
    pools = await getPoolInfo();
  } catch (error) {
    console.error('Error pool info:', error);
  }

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}&submodules=geocoder`}
      />
      <main className="my-[1.3rem]">
        <Nav />
        <div className="mx-[20rem] h-[550px] mt-8 border border-gray-200">
          <Map pools={pools} />
        </div>
      </main>
    </>
  );
}
