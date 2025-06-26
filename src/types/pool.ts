import { Database } from './supabase/database.types';

type Pool = Database['public']['Tables']['pools']['Row'];

export type NearByPool =
  Database['public']['Functions']['get_nearby_pools']['Returns'][number];

export type DetailPool = Omit<
  Database['public']['Tables']['pool_details']['Row'],
  'operation_hours' | 'parking_info'
> & {
  operation_hours: Record<
    'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun',
    string
  >;
  parking_info: string[];
  pools: Pick<Pool, 'road_address' | 'jibun_address'>;
};

export interface PoolInfo {
  id: string;
  name: string;
  road_address: string;
  latitude: number;
  longitude: number;
}

export interface DetailRowProps {
  icon: string;
  alt: string;
  children: React.ReactNode;
  multiline?: boolean;
  className?: string;
}
