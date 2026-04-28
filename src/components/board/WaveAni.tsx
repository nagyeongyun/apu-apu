import Image from 'next/image';

export default function WaveAni() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 sm:h-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="absolute inset-0">
        <div className="relative h-full w-full origin-bottom animate-wave-back">
          <Image
            src="/images/wave-back.svg"
            alt="wave-back"
            fill
            className="object-fill object-bottom"
          />
        </div>
      </div>

      <div className="absolute inset-0">
        <div className="relative h-full w-full origin-bottom animate-wave-front">
          <Image
            src="/images/wave-front.svg"
            alt="wave-front"
            fill
            unoptimized
            className="object-fill object-bottom"
          />
        </div>
      </div>
    </div>
  );
}
