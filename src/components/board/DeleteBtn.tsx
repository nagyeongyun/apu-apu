'use client';

import { useState } from 'react';
import DeleteIcon from '/public/images/delete-icon.svg';
import DeleteModal from './DeleteModal';

export default function DeleteBtn({ postId }: { postId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-[#aaaaaa] hover:text-red-500"
      >
        <DeleteIcon />
      </button>

      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        postId={postId}
      />
    </>
  );
}
