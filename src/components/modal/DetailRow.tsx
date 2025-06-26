import Image from 'next/image';
import { DetailRowProps } from '@/types/pool';

export default function DetailRow({
  icon,
  alt,
  children,
  multiline = false,
  className = '',
}: DetailRowProps) {
  return (
    <div
      className={`flex flex-row ${
        multiline ? 'items-start' : 'items-center'
      } space-x-2 ${className}`}
    >
      <div className="relative w-[10px] md:w-[12px] xl:w-[14px] h-[10px] md:h-[12px] xl:h-[14px]">
        <Image
          src={`/images/${icon}`}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
      <div className={`truncate ${multiline ? '-space-y-1 -mt-[3.5px]' : ''}`}>
        {children}
      </div>
    </div>
  );
}
