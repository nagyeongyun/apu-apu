'use client';

import { useEffect, useState } from 'react';
import { getDetailPool } from '@/services/client/map';
import { useCoordStore } from '@/store/coordStore';
import { DetailPool } from '@/types/pool';
import { days, dayLabelMap } from '@/utils/constants';
import DetailRow from './DetailRow';
import DeleteIcon from '/public/images/delete-icon.svg';

export default function DetailModal() {
  const { selectedPoolId, setSelectedPoolId } = useCoordStore();
  const [detail, setDetail] = useState<DetailPool | null>(null);
  const [isError, setIsError] = useState(false);

  const handleClickDelete = () => {
    setSelectedPoolId(null);
  };

  useEffect(() => {
    if (!selectedPoolId) return;

    const fetchDetailPool = async () => {
      try {
        const detail = await getDetailPool(selectedPoolId);
        if (!detail) {
          setIsError(true);
        } else {
          setDetail(detail);
        }
      } catch (error) {
        console.error('detail pool error', error);
      }
    };

    fetchDetailPool();
  }, [selectedPoolId]);

  if (!detail) return null;

  return (
    <div
      className="absolute inset-0 flex justify-center items-center z-50 bg-black/40"
      onClick={handleClickDelete}
    >
      <div
        className="w-[33rem] h-[30rem] bg-white rounded-lg p-8 text-[0.9rem] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {isError ? (
          <p className="text-center">상세 정보를 불러올 수 없습니다.</p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <p className="text-[1.2rem] font-semibold mr-3">
                  {detail.name}
                </p>
                <p className="text-[0.85rem] text-neutral-400">
                  {detail.operator}
                </p>
              </div>
              <button className="text-[#aaaaaa] hover:text-red-500">
                <DeleteIcon
                  width="13"
                  height="13"
                  onClick={handleClickDelete}
                />
              </button>
            </div>
            <div className="space-y-1">
              <DetailRow
                icon="location-icon.svg"
                alt="location"
                size={14}
                multiline
                className="pb-[2px]"
              >
                <p>{detail.pools.road_address}</p>
                <p>{detail.pools.jibun_address}</p>
              </DetailRow>

              <DetailRow icon="clock-icon.svg" alt="time" size={15} multiline>
                {days.map((key) => (
                  <p key={key}>
                    {dayLabelMap[key]} {detail.operation_hours[key]}
                  </p>
                ))}
                <p>
                  <span className="text-[#dd3636]">공휴일</span>{' '}
                  {detail.holiday}
                </p>
                {detail.regular_holiday && (
                  <p>
                    <span className="text-[#dd3636]">정기휴일</span>{' '}
                    {detail.regular_holiday}
                  </p>
                )}
                <p className="text-neutral-400 text-[0.7rem] pt-1">
                  <span className="inline-block align-middle">*</span>{' '}
                  프로그램별 정확한 운영 시간은 홈페이지를 참고해 주세요.
                </p>
              </DetailRow>

              <DetailRow icon="link-icon.svg" alt="url" size={15}>
                <div className="text-[#3878cc] hover:underline">
                  <a
                    href={detail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    홈페이지 이동
                  </a>
                </div>
              </DetailRow>

              <DetailRow icon="phone-icon.svg" alt="phone-number" size={14}>
                <p>{detail.contact}</p>
              </DetailRow>

              <DetailRow icon="swim-icon.svg" alt="facility_size" size={15}>
                <p>{detail.facility_size}</p>
              </DetailRow>

              <DetailRow icon="pin-icon.svg" alt="amenities" size={13}>
                <p>{detail.amenities}</p>
              </DetailRow>

              <DetailRow
                icon="parking-icon.svg"
                alt="parking"
                size={15}
                multiline
                className="pt-[2px]"
              >
                {detail.parking_info.map((info, idx) => (
                  <p key={idx}>{info}</p>
                ))}
              </DetailRow>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
