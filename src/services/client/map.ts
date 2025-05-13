import { apiClient } from '../apiClient';
import { NearByPool, DetailPool } from '@/types/pool';

export const getNearbyPools = async (lat: number, lng: number) => {
  return apiClient<NearByPool[]>(`/api/pool/nearby?lat=${lat}&lng=${lng}`);
};

export const getDetailPool = async (id: string) => {
  return apiClient<DetailPool>(`/api/pool/${id}`);
};
