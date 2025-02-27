import { Coordinates } from '@/types/map';

export interface PoolStore {
  selectedPool: { id: string | null; coords: Coordinates | null } | null;
  setSelectedPool: (id: string, coords: Coordinates) => void;
}
