'use client';

import Script from 'next/script';
import { useState } from 'react';
import Map from '@/components/main/Map';
import { PoolInfo } from '@/types/pool';

export default function MapLoader({ pools }: { pools: PoolInfo[] }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_KEY}&submodules=geocoder`}
        onLoad={() => {
          setIsMapLoaded(true);
        }}
      />

      {isMapLoaded ? (
        <Map pools={pools} />
      ) : (
        <div className="flex items-center justify-center h-full"></div>
      )}
    </>
  );
}
