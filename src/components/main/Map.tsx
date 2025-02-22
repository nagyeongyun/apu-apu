'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Coordinates, NaverMap } from '@/types/map';
import { PoolInfo } from '@/types/pool';
import { usePoolStore } from '@/store/poolStore';

const mapId = 'map';
const initMapLevel = 14;
const initLoc: Coordinates = [37.5666103, 126.9783882];

export default function Map({ pools }: { pools: PoolInfo[] }) {
  const mapRef = useRef<NaverMap | null>(null);
  const [loc, setLoc] = useState<Coordinates>(initLoc);
  const [address, setAddress] = useState<string>('위치 로드중...');
  const { selectedPoolId, setSelectedPoolId } = usePoolStore();

  // 지도 중심 업데이트
  const updateMapCenter = (newCenter: naver.maps.LatLng) => {
    if (mapRef.current) {
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(initMapLevel);
    }
  };

  // 주소 가져오기
  const updateAddress = (coordinates: Coordinates) => {
    const newCenter = new naver.maps.LatLng(coordinates[0], coordinates[1]);
    naver.maps.Service.reverseGeocode(
      { coords: newCenter },
      (status, response) => {
        if (status === naver.maps.Service.Status.OK) {
          const newAddress = response.v2.address.jibunAddress;
          setAddress(newAddress);
          updateMapCenter(newCenter);
        } else {
          console.error('Address error');
          setAddress('주소를 찾을 수 없습니다.');
        }
      },
    );
  };

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    try {
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
          setAddress('현재 위치를 찾을 수 없습니다.');
        },
      );
    } catch (error) {
      console.error('Geolocation error', error);
      setAddress('현재 위치를 찾을 수 없습니다.');
    }
  };

  // 마커 표시하기
  const createMarkers = () => {
    if (!mapRef.current) return;

    pools.forEach(({ id, name, latitude, longitude }) => {
      const marker = new naver.maps.Marker({
        map: mapRef.current as naver.maps.Map,
        position: new naver.maps.LatLng(latitude, longitude),
        icon: {
          url: '/images/pool-marker.svg',
          scaledSize: new naver.maps.Size(40, 40),
        },
      });

      // 마커 호버 시 이름 표시
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:3px 6px; font-size: 14px; font-family: var(--font-pretendard);">${name}</div>`,
      });

      naver.maps.Event.addListener(marker, 'mouseover', () =>
        infoWindow.open(mapRef.current!, marker),
      );
      naver.maps.Event.addListener(marker, 'mouseout', () =>
        infoWindow.close(),
      );

      // 마커 클릭 시 상태 업데이트
      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedPoolId(id);
      });
    });
  };

  useEffect(() => {
    // 지도 그리기
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map(mapId, {
        center: new naver.maps.LatLng(loc[0], loc[1]),
        zoom: initMapLevel,
        minZoom: 7,
      });
    }

    createMarkers();
    getCurrentLocation();
  }, []);

  return (
    <div className="flex flex-row">
      <div id={mapId} className="w-[65%] h-[550px] bg-gray-100"></div>
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
