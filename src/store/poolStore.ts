import { create } from 'zustand';
import { PoolStore } from '@/types/store';

export const usePoolStore = create<PoolStore>()((set) => ({
  selectedPool: null,
  setSelectedPool: (id, coords) => set({ selectedPool: { id, coords } }),
}));
