import Image from 'next/image';

interface IconProps {
  name: string;
  alt: string;
  size: number;
}

export default function IconImg({ name, alt, size }: IconProps) {
  return (
    <>
      <Image src={`images/${name}`} alt={alt} width={size} height={size} />
    </>
  );
}
