'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Coordinates, NaverMap } from '@/types/map';
import { PoolInfo, NearByPool } from '@/types/pool';
import { useCoordStore } from '@/store/coordStore';
import { getNearbyPools } from '@/services/client/map';
import List from './List';

const mapId = 'map';
const initMapLevel = 14;
const initCoord: Coordinates = [37.5666103, 126.9783882];

export default function Map({ pools }: { pools: PoolInfo[] }) {
  const mapRef = useRef<NaverMap | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [coord, setCoord] = useState<Coordinates>(initCoord);
  const [address, setAddress] = useState<string>('현재 위치 찾는중...');
  const [nearbyPools, setNearbyPools] = useState<NearByPool[]>([]);
  const { selectedCoord } = useCoordStore();

  // 지도 중심 업데이트
  const updateMapCenter = (newCenter: naver.maps.LatLng) => {
    if (mapRef.current) {
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(initMapLevel);
    }
  };

  useEffect(() => {
    if (selectedCoord) {
      updateMapCenter(
        new naver.maps.LatLng(selectedCoord[0], selectedCoord[1]),
      );
    }
  }, [selectedCoord]);

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

  // 현재 위치 바뀔 때마다 근처 수영장 리스트 업데이트
  useEffect(() => {
    const fetchNearbyPools = async () => {
      try {
        const pools = await getNearbyPools(coord[0], coord[1]);
        setNearbyPools(pools);
      } catch (error) {
        console.error('nearby pools error', error);
      }
    };

    fetchNearbyPools();
  }, [coord]);

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLoc: Coordinates = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCoord(currentLoc);
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

    pools.forEach(({ name, latitude, longitude }) => {
      const marker = new naver.maps.Marker({
        map: mapRef.current as NaverMap,
        position: new naver.maps.LatLng(latitude, longitude),
        icon: {
          url: '/images/pool-marker.svg',
          scaledSize: new naver.maps.Size(40, 40),
        },
      });

      // 마커 호버 시 이름 표시
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:3px 6px; font-size: 14px; font-family: var(--font-pretendard);">${name}</div>`,
        anchorSize: {
          width: 9,
          height: 8,
        },
      });

      naver.maps.Event.addListener(marker, 'mouseover', () =>
        infoWindow.open(mapRef.current!, marker),
      );
      naver.maps.Event.addListener(marker, 'mouseout', () =>
        infoWindow.close(),
      );

      // // 마커 클릭 시 상태 업데이트
      // naver.maps.Event.addListener(marker, 'click', () => {
      //   setSelectedPool(id);
      // });

      markersRef.current.push(marker);
    });
  };

  // 마커 표시
  const showMarker = (map: NaverMap, marker: naver.maps.Marker) => {
    marker.setMap(map);
  };

  // 마커 숨김
  const hideMarker = (marker: naver.maps.Marker) => {
    marker.setMap(null);
  };

  // 마커 업데이트 유무 체크
  const updateMarkers = (map: NaverMap, markers: naver.maps.Marker[]) => {
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

  useEffect(() => {
    // 지도 그리기
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map(mapId, {
        center: new naver.maps.LatLng(coord[0], coord[1]),
        zoom: initMapLevel,
        minZoom: 7,
      });
    }

    createMarkers();
    getCurrentLocation();

    // 줌 인아웃 시 마커 업데이트
    naver.maps.Event.addListener(mapRef.current, 'zoom_changed', () => {
      if (mapRef.current !== null) {
        updateMarkers(mapRef.current, markersRef.current);
      }
    });

    // 드래그 시 마커 업데이트
    naver.maps.Event.addListener(mapRef.current, 'dragend', () => {
      if (mapRef.current !== null) {
        updateMarkers(mapRef.current, markersRef.current);
      }
    });
  }, []);

  return (
    <div className="flex flex-row h-full">
      <div id={mapId} className="w-[65%] bg-gray-100"></div>
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
        <List nearbyPools={nearbyPools} />
      </div>
    </div>
  );
}
