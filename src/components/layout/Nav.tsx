'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SideBar from './SideBar';

export default function Nav() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex justify-between items-center border-b border-neutral-200 px-[1.5rem] md:px-[2rem] pb-[1rem] pt-[1.3rem] text-[0.9rem]">
      <div className="flex items-center">
        <button
          className="md:hidden"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <Image
            src="/images/menu-icon.svg"
            alt="menu"
            width={18}
            height={18}
          />
        </button>
        <div className="md:hidden w-px h-5 bg-neutral-300 mx-3" />
        <div className="relative w-[90px] md:w-[120px]">
          <Link href={'/'} className="inline-block">
            <Image
              src="/images/logo.svg"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden
      ${
        showSidebar
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }
    `}
        onClick={() => setShowSidebar(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white w-[180px] shadow-md md:hidden
      transform transition-transform duration-200
      ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
    `}
      >
        <SideBar onClose={() => setShowSidebar(false)} />
      </div>
    </div>
  );
}
