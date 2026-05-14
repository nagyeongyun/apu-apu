import MapLoader from '@/components/main/MapLoader';
import { PoolInfo } from '@/types/pool';
import { getPoolInfo } from '@/services/server/map';

export default async function Home() {
  let pools: PoolInfo[] = [];

  try {
    pools = await getPoolInfo();
  } catch (error) {
    console.error(error);
  }

  return <MapLoader pools={pools} />;
}
