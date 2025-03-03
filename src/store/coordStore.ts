import { create } from 'zustand';
import { CoordStore } from '@/types/store';

export const useCoordStore = create<CoordStore>()((set) => ({
  selectedCoord: null,
  setSelectedCoord: (coords) => set({ selectedCoord: coords }),
}));
