'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ModalPortal from '@/components/modal/ModalPortal';
import { WriteModalProps } from '@/types/board';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { writePostSchema, WritePostFormValues } from '@/types/board';
import EyeIcon from '/public/images/eye.svg';
import EyeOffIcon from '/public/images/eye-off.svg';
import CloseIcon from '/public/images/close-icon.svg';
import { createPostAction } from '@/app/board/actions';

export default function WriteModal({ isOpen, onClose }: WriteModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<WritePostFormValues>({
    resolver: zodResolver(writePostSchema),
    defaultValues: {
      name: '',
      password: '',
      content: '',
    },
    mode: 'onChange',
  });

  if (!isOpen) return null;

  const nameValue = watch('name') || '';
  const passwordValue = watch('password') || '';
  const contentValue = watch('content') || '';

  const onSubmit = async (data: WritePostFormValues) => {
    try {
      clearErrors('root');

      const result = await createPostAction(data);

      if (!result.success) {
        setError('root', {
          type: 'server',
          message: result.error || '게시글 등록에 실패했습니다.',
        });
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ['posts'],
      });

      onClose();
      reset();
    } catch (error) {
      console.error(error);
      setError('root', {
        type: 'server',
        message: '게시글 등록 중 오류가 발생했습니다.',
      });
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    clearErrors();
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
        <div
          className="w-full max-w-[20rem] sm:max-w-[32rem] rounded-xl bg-white p-5 sm:p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[1rem] sm:text-[1.1rem] font-semibold">
              글쓰기
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-[#aaaaaa] hover:text-red-500"
            >
              <CloseIcon className="w-3" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <label
                    htmlFor="name"
                    className="text-[0.8rem] sm:text-[0.9rem] text-gray-700"
                  >
                    닉네임
                  </label>
                  <div className="text-[0.7rem] sm:text-[0.78rem] text-gray-400 select-none">
                    {nameValue.length}/6
                  </div>
                </div>
                <input
                  id="name"
                  type="text"
                  maxLength={6}
                  placeholder="익명의물개"
                  className="h-9 sm:h-11 rounded-md border border-gray-200 px-2 sm:px-3 text-[0.75rem] sm:text-[0.95rem] outline-none focus:border-gray-400"
                  {...register('name', {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\s/g, '');
                    },
                  })}
                />

                {errors.name && (
                  <p className="text-[0.6rem] sm:text-[0.75rem] text-red-500 whitespace-nowrap select-none">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <label
                    htmlFor="password"
                    className="text-[0.8rem] sm:text-[0.9rem] text-gray-700"
                  >
                    비밀번호
                  </label>
                  <div className="text-[0.7rem] sm:text-[0.78rem] text-gray-400 select-none">
                    {passwordValue.length}/8
                  </div>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    maxLength={8}
                    placeholder="삭제 시 필요해요!"
                    className="h-9 sm:h-11 w-full rounded-md border border-gray-200 px-2 sm:px-3 text-[0.75rem] sm:text-[0.95rem] outline-none focus:border-gray-400"
                    {...register('password', {
                      onChange: (e) => {
                        e.target.value = e.target.value.replace(/\s/g, '');
                      },
                    })}
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
                {errors.password && (
                  <p className="text-[0.6rem] sm:text-[0.75rem] text-red-500 whitespace-nowrap select-none">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 sm:mb-5 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-1">
                <label
                  htmlFor="content"
                  className="text-[0.8rem] sm:text-[0.9rem] text-gray-700"
                >
                  내용
                </label>
                <div className="text-right text-[0.7rem] sm:text-[0.78rem] text-gray-400 select-none">
                  {contentValue.length}/100
                </div>
              </div>
              <textarea
                id="content"
                maxLength={100}
                placeholder="내용을 입력하세요."
                className="h-20 sm:h-40 resize-none rounded-md border border-gray-200 p-3 text-[0.75rem] sm:text-[0.95rem] outline-none focus:border-gray-400"
                {...register('content')}
              />
              {errors.content && (
                <p className="text-[0.6rem] sm:text-[0.75rem] text-red-500 whitespace-nowrap select-none">
                  {errors.content.message}
                </p>
              )}
              {errors.root?.message && (
                <p className="text-[0.6rem] sm:text-[0.75rem] text-red-500">
                  {errors.root.message}
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
                className="rounded-md bg-main px-4 py-2 text-[0.8rem] sm:text-[0.9rem] text-white hover:bg-[#1974b5] disabled:opacity-50"
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
