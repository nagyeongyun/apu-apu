import { Coordinates } from '@/types/map';

export interface CoordStore {
  selectedPoolId: string | null;
  selectedCoord: Coordinates | null;
  setSelectedPoolId: (id: string | null) => void;
  setSelectedCoord: (coords: Coordinates) => void;
}

export interface MapStateStore {
  isMapLoaded: boolean;
  setIsMapLoaded: (loaded: boolean) => void;
}
