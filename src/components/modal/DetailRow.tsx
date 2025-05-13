import IconImg from '../icon/IconImg';
import { DetailRowProps } from '@/types/pool';

export default function DetailRow({
  icon,
  alt,
  size,
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
      <IconImg name={icon} alt={alt} size={size} />
      <div className={multiline ? '-space-y-1 -mt-[3px]' : ''}>{children}</div>
    </div>
  );
}
