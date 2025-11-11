'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { PoolInfo } from '@/types/pool';
import { useCoordStore } from '@/store/mapStore';
import useCurrentLocation from '../../hooks/map/useCurrentLocation';
import {
  createMarkerWithInfoWindow,
  updateMapCenter,
  updateMarkers,
} from './mapUtils';
import List from './List';
import ModalPortal from '../modal/ModalPortal';
import DetailModal from '../modal/DetailModal';

const MAP_ID = 'map';
const INIT_MAP_LEVEL = 14;

export default function Map({ pools }: { pools: PoolInfo[] }) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const userMarkerRef = useRef<naver.maps.Marker | null>(null);
  const { setSelectedPoolId, selectedPoolId, selectedCoord } = useCoordStore();
  const { coords, address, isLoading, isError, currentLocation } =
    useCurrentLocation();

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map(MAP_ID, {
        center: new naver.maps.LatLng(coords[0], coords[1]),
        zoom: INIT_MAP_LEVEL,
        minZoom: 7,
      });
    }

    pools.forEach(({ id, name, latitude, longitude }) => {
      const marker = createMarkerWithInfoWindow({
        position: new naver.maps.LatLng(latitude, longitude),
        iconUrl: '/images/pool-marker.svg',
        markerName: name,
        map: mapRef.current as naver.maps.Map,
      });

      marker.addListener('click', () => {
        setSelectedPoolId(id);
      });

      markersRef.current.push(marker);
    });

    currentLocation();

    const idleListener = naver.maps.Event.addListener(
      mapRef.current,
      'idle',
      () => {
        if (mapRef.current !== null) {
          updateMarkers({ map: mapRef.current, markers: markersRef.current });
        }
      },
    );

    return () => {
      naver.maps.Event.removeListener(idleListener);
    };
  }, []);

  useEffect(() => {
    if (!userMarkerRef.current) {
      userMarkerRef.current = createMarkerWithInfoWindow({
        position: new naver.maps.LatLng(coords[0], coords[1]),
        iconUrl: '/images/user-marker.svg',
        markerName: 'YOU',
        map: mapRef.current as naver.maps.Map,
      });
    } else {
      userMarkerRef.current.setPosition(
        new naver.maps.LatLng(coords[0], coords[1]),
      );
    }

    updateMapCenter({
      map: mapRef.current as naver.maps.Map,
      newCenter: new naver.maps.LatLng(coords[0], coords[1]),
      zoomLevel: INIT_MAP_LEVEL,
    });
  }, [coords]);

  useEffect(() => {
    if (selectedCoord) {
      updateMapCenter({
        map: mapRef.current as naver.maps.Map,
        newCenter: new naver.maps.LatLng(selectedCoord[0], selectedCoord[1]),
        zoomLevel: 18,
      });
    }
  }, [selectedCoord]);

  return (
    <div className="flex-1 h-full relative">
      <div id={MAP_ID} className="w-full h-full bg-gray-100" />
      {selectedPoolId && (
        <ModalPortal>
          <DetailModal />
        </ModalPortal>
      )}
      <div className="absolute bottom-0 w-full h-1/2 md:top-4 md:bottom-4 md:right-8 md:h-auto md:inset-y-10 md:w-[250px] xl:w-[270px] 3xl:w-[350px] md:rounded-xl md:border-none bg-white p-5 rounded-t-xl pt-6 pb-16 border border-t-gray-200">
        <div className="flex items-center md:text-[0.95rem] xl:text-[1rem] 3xl:text-[1.2rem] pb-1">
          <button
            onClick={currentLocation}
            className="mr-2 border border-neutral-300 shadow p-[0.3rem] rounded-xl hover:bg-neutral-100"
          >
            <Image src="/images/gps.svg" alt="gps-icon" width={13} height={0} />
          </button>
          <p className="text-[1.05rem] font-semibold md:font-medium text-main md:text-[0.8rem] xl:text-[0.95rem]">
            {isLoading ? '위치 찾는중...' : address}
          </p>
        </div>
        <List coords={coords} isError={isError} isLoading={isLoading} />
      </div>
    </div>
  );
}
