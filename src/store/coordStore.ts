import { create } from 'zustand';
import { CoordStore } from '@/types/store';

export const useCoordStore = create<CoordStore>()((set) => ({
  selectedPoolId: null,
  selectedCoord: null,
  setSelectedPoolId: (id) => set({ selectedPoolId: id }),
  setSelectedCoord: (coords) => set({ selectedCoord: coords }),
}));
