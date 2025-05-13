import { useCoordStore } from '@/store/coordStore';
import { Coordinates } from '@/types/map';
import { NearByPool } from '@/types/pool';

export default function List({ nearbyPools }: { nearbyPools: NearByPool[] }) {
  const { setSelectedPoolId, setSelectedCoord } = useCoordStore();

  const handlePoolClick = (id: string, coords: Coordinates) => {
    setSelectedPoolId(id);
    setSelectedCoord(coords);
  };

  return (
    <div className="flex flex-col max-h-full flex-1 mx-1 mt-3">
      <p className="text-[0.85rem] mb-[0.5rem]">현재 위치 5km 내 수영장</p>
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
