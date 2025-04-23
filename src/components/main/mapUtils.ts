import { MarkerProps, MapCenterProps, UpdateMarkersProps } from '@/types/map';

export const createMarkerWithInfoWindow = ({
  map,
  position,
  iconUrl,
  markerName,
}: MarkerProps) => {
  const marker = new naver.maps.Marker({
    position,
    map,
    icon: {
      url: iconUrl,
      scaledSize:
        markerName === 'YOU'
          ? new naver.maps.Size(30, 30)
          : new naver.maps.Size(40, 40),
    },
  });

  const infoWindow = new naver.maps.InfoWindow({
    content: `<div style="padding:3px 6px; font-size: 14px; font-family: var(--font-pretendard);">${markerName}</div>`,
    anchorSize: { width: 9, height: 8 },
  });

  naver.maps.Event.addListener(marker, 'mouseover', () =>
    infoWindow.open(map!, marker),
  );
  naver.maps.Event.addListener(marker, 'mouseout', () => infoWindow.close());

  return marker;
};

export const updateMapCenter = ({
  map,
  newCenter,
  zoomLevel,
}: MapCenterProps) => {
  if (!map) return;

  map.setOptions({
    center: newCenter,
    ...(zoomLevel && { zoom: zoomLevel }),
  });
};

export const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
  marker.setMap(map);
};

export const hideMarker = (marker: naver.maps.Marker) => {
  marker.setMap(null);
};

export const updateMarkers = ({ map, markers }: UpdateMarkersProps) => {
  const mapBounds = map.getBounds() as naver.maps.LatLngBounds;

  if (!mapBounds) return;

  for (let i = 0; i < markers.length; i += 1) {
    const position = markers[i].getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, markers[i]);
    } else {
      hideMarker(markers[i]);
    }
  }
};
