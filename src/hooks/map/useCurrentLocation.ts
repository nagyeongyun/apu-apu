import { useState, useEffect } from 'react';
import { Coordinates, CurrentLocationState } from '@/types/map';

const INIT_COORD: Coordinates = [37.5666103, 126.9783882];
const ERROR_MSG = '현재 위치를 찾을 수 없습니다.';

export default function useCurrentLocation() {
  const [locationState, setLocationState] = useState<CurrentLocationState>({
    coords: INIT_COORD,
    address: '현재 위치 찾는중...',
    isLoading: true,
    isError: false,
  });

  const getAddress = (coordinates: Coordinates) => {
    const newCenter = new naver.maps.LatLng(coordinates[0], coordinates[1]);
    naver.maps.Service.reverseGeocode(
      { coords: newCenter },
      (status, response) => {
        if (status === naver.maps.Service.Status.OK) {
          const newAddress = response.v2.address.jibunAddress;
          setLocationState((prev) => ({ ...prev, address: newAddress }));
        } else {
          setLocationState((prev) => ({
            ...prev,
            address: ERROR_MSG,
          }));
        }
      },
    );
  };

  const getCurrentLocation = () => {
    setLocationState((prev) => ({ ...prev, isLoading: true }));

    if (!navigator.geolocation) {
      setLocationState((prev) => ({
        ...prev,
        address: ERROR_MSG,
        isLoading: false,
        isError: true,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentCoords: Coordinates = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setLocationState((prev) => ({
          ...prev,
          coords: currentCoords,
          isLoading: false,
          isError: false,
        }));
        getAddress(currentCoords);
      },
      (error) => {
        console.error('위치 권한 거부', error);
        setLocationState((prev) => ({
          ...prev,
          address: ERROR_MSG,
          isLoading: false,
          isError: true,
        }));
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    coords: locationState.coords,
    address: locationState.address,
    isLoading: locationState.isLoading,
    isError: locationState.isError,
    currentLocation: getCurrentLocation,
  };
}
