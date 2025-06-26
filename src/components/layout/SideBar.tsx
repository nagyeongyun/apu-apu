'use client';

import Link from 'next/link';
import DeleteIcon from '/public/images/delete-icon.svg';
import { usePathname } from 'next/navigation';
import MapIcon from '/public/images/map-icon.svg';
import BoardIcon from '/public/images/board-icon.svg';

export default function SideBar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const menuList = [
    {
      name: '수영장 찾기',
      path: '/',
      icon: <MapIcon width="16" height="16" />,
    },
    {
      name: '게시판',
      path: '/board',
      icon: <BoardIcon width="16" height="16" />,
    },
  ];

  return (
    <div className="flex flex-col border-r border-neutral-200 h-full py-8 md:py-6 px-[1.2rem] md:px-[1.8rem] space-y-2">
      <button
        className="block md:hidden mb-10 ml-2 text-[#616161]"
        onClick={onClose}
      >
        <DeleteIcon width={10} height={10} />
      </button>

      {menuList.map((menu) => {
        const isActive = pathname === menu.path;
        return (
          <Link
            key={menu.name}
            href={menu.path}
            className={`block rounded-lg py-[0.5rem] px-[0.7rem] hover:bg-main-100 ${
              isActive ? 'bg-main-100' : ''
            }`}
          >
            <div className="flex flex-row items-center space-x-2">
              <div
                className={`${
                  isActive ? 'text-neutral-800' : 'text-neutral-400'
                }`}
              >
                {menu.icon}
              </div>
              <p
                className={`${
                  isActive
                    ? 'text-neutral-800 font-semibold'
                    : 'text-neutral-600'
                }`}
              >
                {menu.name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
