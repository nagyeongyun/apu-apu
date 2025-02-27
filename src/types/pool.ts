export interface PoolInfo {
  id: string;
  name: string;
  road_address: string;
  latitude: number;
  longitude: number;
}

export interface NearByPool {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  road_address: string;
  jibun_address: string;
  dist_meters: number;
}
