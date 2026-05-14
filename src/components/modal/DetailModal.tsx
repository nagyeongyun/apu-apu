'use client';

import { useQuery } from '@tanstack/react-query';
import { getDetailPool } from '@/services/client/map';
import { days, dayLabelMap } from '@/utils/constants';
import { DetailModalProps } from '@/types/pool';
import DetailRow from './DetailRow';
import CloseIcon from '/public/images/close-icon.svg';

export default function DetailModal({ poolId, onClose }: DetailModalProps) {
  const {
    data: detail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['poolDetail', poolId],
    queryFn: async () => {
      const data = await getDetailPool(poolId);

      if (!data) {
        throw new Error('상세 정보를 불러올 수 없습니다.');
      }

      return data;
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/40"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-[20rem] sm:w-[25rem] md:w-[30rem] xl:w-[33rem] max-h-[80dvh] overflow-y-auto bg-white rounded-lg p-4 sm:p-5 xl:p-7 text-[0.9rem] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <p className="text-center text-neutral-500">
            상세 정보를 불러오는 중입니다.
          </p>
        )}

        {isError && (
          <div className="text-center">
            <p className="text-red-500">상세 정보를 불러올 수 없습니다.</p>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-sm text-neutral-500 hover:underline"
            >
              닫기
            </button>
          </div>
        )}

        {!isLoading && !isError && detail && (
          <>
            <div className="flex items-center justify-between mb-3 xl:mb-4">
              <div className="flex items-center min-w-0">
                <p className="md:text-[1.1rem] xl:text-[1.2rem] font-semibold mr-3 truncate">
                  {detail.name}
                </p>
                <p className="text-[0.7rem] md:text-[0.75rem] xl:text-[0.85rem] text-neutral-400 shrink-0">
                  {detail.operator}
                </p>
              </div>

              <button
                type="button"
                aria-label="상세 모달 닫기"
                className="text-[#aaaaaa] hover:text-red-500"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-1 text-[0.7rem] sm:text-[0.75rem] md:text-[0.85rem] xl:text-[0.95rem]">
              <DetailRow icon="location-icon.svg" alt="location" multiline>
                <p>{detail.pools.road_address}</p>
                <p>{detail.pools.jibun_address}</p>
              </DetailRow>

              <DetailRow icon="clock-icon.svg" alt="time" multiline>
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

                <p className="text-neutral-400 text-[0.65rem] sm:text-[0.7rem] pt-1">
                  <span className="inline-block align-middle">*</span>{' '}
                  프로그램별 정확한 운영 시간은 홈페이지를 참고해 주세요.
                </p>
              </DetailRow>

              <DetailRow icon="link-icon.svg" alt="url">
                <a
                  href={detail.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3878cc] hover:underline"
                >
                  홈페이지 이동
                </a>
              </DetailRow>

              <DetailRow icon="phone-icon.svg" alt="phone-number">
                <p>{detail.contact}</p>
              </DetailRow>

              <DetailRow icon="swim-icon.svg" alt="facility_size">
                <p>{detail.facility_size}</p>
              </DetailRow>

              <DetailRow icon="pin-icon.svg" alt="amenities">
                <p>{detail.amenities}</p>
              </DetailRow>

              <DetailRow icon="parking-icon.svg" alt="parking" multiline>
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
