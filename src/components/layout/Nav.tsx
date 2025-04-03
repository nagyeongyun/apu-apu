import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex justify-between items-center border-b border-neutral-200 px-[2.5rem] pb-[1rem] pt-[1.3rem] text-[0.9rem]">
      <div>
        <Link href={'/'} className="inline-block">
          <Image src="/images/logo.svg" alt="logo" width={105} height={0} />
        </Link>
      </div>
      <div>
        <Link href={'/'}>
          <p className="mb-1 hover:text-main hover:font-normal">로그인</p>
        </Link>
      </div>
    </div>
  );
}
