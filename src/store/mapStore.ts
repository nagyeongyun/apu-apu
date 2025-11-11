import { create } from 'zustand';
import { CoordStore, MapStateStore } from '@/types/store';

export const useCoordStore = create<CoordStore>()((set) => ({
  selectedPoolId: null,
  selectedCoord: null,
  setSelectedPoolId: (id) => set({ selectedPoolId: id }),
  setSelectedCoord: (coords) => set({ selectedCoord: coords }),
}));

export const useMapStore = create<MapStateStore>((set) => ({
  isMapLoaded: false,
  setIsMapLoaded: (loaded) => set({ isMapLoaded: loaded }),
}));
