import { useCoordStore } from '@/store/coordStore';
import { Coordinates } from '@/types/map';
import { NearByPool } from '@/types/pool';

export default function List({ nearbyPools }: { nearbyPools: NearByPool[] }) {
  const { setSelectedCoord } = useCoordStore();

  // 리스트에서 수영장 클릭
  const handlePoolClick = (coords: Coordinates) => {
    setSelectedCoord(coords);
  };

  return (
    <div className={`flex flex-col max-h-full flex-1 mx-1 mt-3 `}>
      <p className="text-[0.85rem] mb-[0.5rem]">현재 위치 5km 내 수영장</p>
      <div className={`overflow-y-auto [&::-webkit-scrollbar]:hidden`}>
        {nearbyPools.map((pool, idx) => (
          <div
            key={pool.id}
            onClick={() => handlePoolClick([pool.latitude, pool.longitude])}
            className="text-[0.8rem] cursor-pointer"
          >
            <div className="flex items-center mb-1">
              <p className="text-[0.95rem] font-medium mr-2">{pool.name}</p>
              <p className="text-neutral-400">
                {pool.dist_meters < 1000
                  ? `${pool.dist_meters}m`
                  : `${(pool.dist_meters / 1000).toFixed(1)}km`}
              </p>
            </div>
            <p className="">{pool.road_address}</p>
            <p>리뷰 별점 들어갈 곳</p>
            {idx !== nearbyPools.length - 1 && (
              <hr className="my-3 cursor-default" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
