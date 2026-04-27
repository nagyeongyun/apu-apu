'use client';

import { useState, FormEvent } from 'react';
import ModalPortal from '@/components/modal/ModalPortal';
import { DeleteModalProps } from '@/types/board';
import EyeIcon from '/public/images/eye.svg';
import EyeOffIcon from '/public/images/eye-off.svg';
import DeleteIcon from '/public/images/delete-icon.svg';
import { deletePostAction } from '@/app/board/actions';

export default function DeleteModal({
  isOpen,
  onClose,
  postId,
}: DeleteModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setPassword('');
    setErrorMessage('');
    setShowPassword(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const result = await deletePostAction(postId, trimmedPassword);

      if (!result.success) {
        setErrorMessage(result.error || '게시글 삭제에 실패했습니다.');
        return;
      }

      handleClose();
    } catch (error) {
      console.error(error);
      setErrorMessage('게시글 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
        <div
          className="w-full max-w-[20rem] sm:max-w-[28rem] rounded-xl bg-white px-6 py-5 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[1rem] sm:text-[1.1rem] font-semibold">
              글 삭제
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-[#aaaaaa] hover:text-red-500"
            >
              <DeleteIcon className="w-3" />
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-6 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-1">
                <label
                  htmlFor="password"
                  className="text-[0.8rem] sm:text-[0.9rem] text-gray-700"
                >
                  비밀번호
                </label>
                <div className="mr-1 text-[0.7rem] sm:text-[0.78rem] text-gray-400 select-none">
                  {password.length}/8
                </div>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  maxLength={8}
                  value={password}
                  placeholder="작성 시 입력한 비밀번호"
                  className="h-9 sm:h-11 w-full rounded-md border border-gray-200 pl-2 sm:pl-3 text-[0.75rem] sm:text-[0.95rem] outline-none focus:border-gray-400"
                  onChange={(e) => {
                    setPassword(e.target.value.replace(/\s/g, ''));
                    if (errorMessage) setErrorMessage('');
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeIcon className="h-3 sm:h-6" />
                  ) : (
                    <EyeOffIcon className="h-3 sm:h-6" />
                  )}
                </button>
              </div>
              {errorMessage && (
                <p className="text-[0.6rem] sm:text-[0.75rem] text-red-500">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md bg-gray-100 px-4 py-2 text-[0.8rem] sm:text-[0.9rem] text-gray-700 hover:bg-gray-200"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-red-500 px-4 py-2 text-[0.8rem] sm:text-[0.9rem] text-white hover:bg-red-600 disabled:opacity-50"
              >
                삭제
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
