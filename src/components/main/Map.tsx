'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { PoolInfo, NearByPool } from '@/types/pool';
import { useCoordStore } from '@/store/coordStore';
import { getNearbyPools } from '@/services/client/map';
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
  const [nearbyPools, setNearbyPools] = useState<NearByPool[]>([]);
  const { setSelectedPoolId, selectedPoolId, selectedCoord } = useCoordStore();
  const { coords, address, isLoading, currentLocation } = useCurrentLocation();

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

    console.log('id', selectedPoolId);

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

  const fetchNearbyPools = async () => {
    try {
      const pools = await getNearbyPools(coords[0], coords[1]);
      setNearbyPools(pools);
    } catch (error) {
      console.error('nearby pools error', error);
    }
  };

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

    fetchNearbyPools();
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

      <div className="absolute inset-y-10 right-10 w-[19%] bg-white p-5 rounded-lg pt-6 pb-16 shadow-md">
        <div className="flex items-center text-[1rem]">
          <button
            onClick={currentLocation}
            className="mr-2 border border-neutral-300 shadow p-[0.3rem] rounded-xl hover:bg-neutral-100"
          >
            <Image src="/images/gps.svg" alt="gps-icon" width={13} height={0} />
          </button>
          <p className="text-main">{isLoading ? '위치 찾는중...' : address}</p>
        </div>
        <List nearbyPools={nearbyPools} />
      </div>
    </div>
  );
}
