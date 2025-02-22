export interface PoolStore {
  selectedPoolId: string | null;
  setSelectedPoolId: (id: string | null) => void;
}
