import { Coordinates } from '@/types/map';

export interface CoordStore {
  selectedCoord: Coordinates | null;
  setSelectedCoord: (coords: Coordinates) => void;
}
