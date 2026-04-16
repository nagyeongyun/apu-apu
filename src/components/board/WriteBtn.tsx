'use client';

import { useState } from 'react';
import WriteModal from './WriteModal';

export default function WriteBtn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mb-4 rounded-md bg-gray-200 px-5 py-1 text-[0.9rem] hover:bg-gray-300"
      >
        글쓰기
      </button>

      <WriteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
