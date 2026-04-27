'use client';

import { useState } from 'react';
import DeleteModal from './DeleteModal';
import TrashIcon from '/public/images/trash-icon.svg';

export default function DeleteBtn({ postId }: { postId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-[#cecece] hover:text-red-500"
      >
        <TrashIcon className="w-4 sm:w-5" />
      </button>

      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        postId={postId}
      />
    </>
  );
}
