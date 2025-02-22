import { create } from 'zustand';
import { PoolStore } from '@/types/store';

export const usePoolStore = create<PoolStore>()((set) => ({
  selectedPoolId: null,
  setSelectedPoolId: (id) => set({ selectedPoolId: id }),
}));
