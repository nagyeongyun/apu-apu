export type Coordinates = [Lng: number, Lat: number];

export interface CurrentLocationState {
  coords: Coordinates;
  address: string;
  isLoading: boolean;
}

export interface MarkerProps {
  map: naver.maps.Map;
  position: naver.maps.LatLng;
  iconUrl: string;
  markerName: string;
}

export interface MapCenterProps {
  map: naver.maps.Map;
  newCenter: naver.maps.LatLng;
  zoomLevel?: number;
}

export interface UpdateMarkersProps {
  map: naver.maps.Map;
  markers: naver.maps.Marker[];
}
