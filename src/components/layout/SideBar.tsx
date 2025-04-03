import Link from 'next/link';

export default function SideBar() {
  return (
    <div className="flex flex-col border-r border-neutral-200 h-full py-6 px-[2rem]">
      <div className="text-left font-medium text-[1rem]">
        <Link
          href={'/'}
          className="block rounded-lg py-[0.5rem] px-[0.7rem] bg-main-100"
        >
          수영장 찾기
        </Link>
      </div>
    </div>
  );
}
