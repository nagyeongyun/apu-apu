import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/map';
import { NearByPool } from '@/types/pool';
import { useCoordStore } from '@/store/coordStore';
import { getNearbyPools } from '@/services/client/map';

export default function List({
  coords,
  isError,
  isLoading,
}: {
  coords: Coordinates;
  isError: boolean;
  isLoading: boolean;
}) {
  const { setSelectedPoolId, setSelectedCoord } = useCoordStore();
  const [nearbyPools, setNearbyPools] = useState<NearByPool[]>([]);

  useEffect(() => {
    if (isLoading) return;

    const fetchNearby = async () => {
      try {
        const data = await getNearbyPools(coords[0], coords[1]);
        setNearbyPools(data);
      } catch (e) {
        console.error('Nearby pools error', e);
      }
    };

    fetchNearby();
  }, [isLoading, coords]);

  const handlePoolClick = (id: string, coords: Coordinates) => {
    setSelectedPoolId(id);
    setSelectedCoord(coords);
  };

  return (
    <div className="flex flex-col max-h-full flex-1 mx-1 mt-3">
      <p className="text-[0.85rem] mb-[0.5rem]">
        {isError ? '서울 중구 5km 내 수영장' : '현재 위치 5km 내 수영장'}
      </p>
      <div className={`overflow-y-auto [&::-webkit-scrollbar]:hidden`}>
        {nearbyPools.map((pool, idx) => (
          <div
            key={pool.id}
            onClick={() =>
              handlePoolClick(pool.id, [pool.latitude, pool.longitude])
            }
            className="text-[0.8rem] cursor-pointer"
          >
            <div className="flex items-center">
              <p className="text-[0.95rem] font-medium mr-2">{pool.name}</p>
              <p className="text-neutral-400">
                {pool.dist_meters < 1000
                  ? `${pool.dist_meters}m`
                  : `${(pool.dist_meters / 1000).toFixed(1)}km`}
              </p>
            </div>
            <p className="">{pool.road_address}</p>
            {idx !== nearbyPools.length - 1 && (
              <hr className="my-2 cursor-default" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
