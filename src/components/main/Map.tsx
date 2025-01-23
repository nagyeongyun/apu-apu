'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Coordinates, NaverMap } from '@/types/map';

const mapId = 'map';
const initMapLevel = 16;
const initLoc: Coordinates = [37.5666103, 126.9783882];

export default function Map() {
  const mapRef = useRef<NaverMap | null>(null);
  const [loc, setLoc] = useState<Coordinates>(initLoc);
  const [address, setAddress] = useState<string>('위치 로드중...');

  // 주소 가져오기
  const updateAddress = (coordinates: Coordinates) => {
    const newCenter = new naver.maps.LatLng(coordinates[0], coordinates[1]);
    naver.maps.Service.reverseGeocode(
      { coords: newCenter },
      (status, response) => {
        if (status === naver.maps.Service.Status.OK) {
          const newAddress =
            response.v2.address.jibunAddress || '현재 위치를 찾을 수 없습니다.';
          setAddress(newAddress);
        } else {
          setAddress('현재 위치를 찾을 수 없습니다.');
        }
      },
    );

    if (mapRef.current) {
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(initMapLevel);
    }
  };

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLoc: Coordinates = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setLoc(currentLoc);
          updateAddress(currentLoc);
        },
        () => {
          console.error('위치 권한 거부');
          updateAddress(initLoc); // 기본 위치로 설정
        },
      );
    } else {
      console.error('Geolocation error');
      updateAddress(initLoc);
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map(mapId, {
        center: new naver.maps.LatLng(loc[0], loc[1]),
        zoom: initMapLevel,
        minZoom: 7,
      });
    }

    getCurrentLocation();
  }, []);

  return (
    <div className="flex flex-row">
      <div id={mapId} className="w-[60%] h-[550px]"></div>
      <div className="flex-grow px-4 py-3">
        <div className="flex items-center text-[1rem]">
          <button
            onClick={getCurrentLocation}
            className="mr-2 border border-neutral-300 shadow p-[0.2rem] rounded hover:bg-neutral-100"
          >
            <Image src="/images/gps.svg" alt="gps-icon" width={13} height={0} />
          </button>
          <p className="text-main">{address}</p>
        </div>
      </div>
    </div>
  );
}
