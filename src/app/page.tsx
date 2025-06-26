import Script from 'next/script';
import Nav from '@/components/layout/Nav';
import SideBar from '@/components/layout/SideBar';
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
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_KEY}&submodules=geocoder`}
      />
      <main className="h-screen [height:100dvh] w-screen flex flex-col">
        <Nav />
        <div className="flex flex-row flex-1">
          <div className="hidden md:block lg:w-[200px] 2xl:w-[12%] h-full">
            <SideBar />
          </div>
          <div className="flex-1 h-full">
            <Map pools={pools} />
          </div>
        </div>
      </main>
    </>
  );
}
