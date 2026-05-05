'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { SCDream } from '@/font';
import { PostsPage } from '@/types/board';
import { fetchPostsPage } from '@/services/client/board';
import { formatDateTime } from '@/utils/formatDate';
import DeleteBtn from './DeleteBtn';
import WaveAni from './WaveAni';
import DotSpinner from './DotSpinner';

interface PostListProps {
  initialPage: PostsPage;
}

export default function PostList({ initialPage }: PostListProps) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPostsPage(pageParam as number),
    initialPageParam: 1,
    initialData: {
      pages: [initialPage],
      pageParams: [1],
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    gcTime: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isError) {
    return (
      <div className="py-10 text-center text-sm text-red-500">
        {error instanceof Error
          ? error.message
          : '게시글 목록을 불러오지 못했습니다.'}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        className={`py-10 text-center text-sm text-gray-400 ${SCDream.className}`}
      >
        등록된 게시글이 없습니다.
      </div>
    );
  }

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-8 ${SCDream.className}`}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative overflow-hidden flex flex-col border border-gray-100 shadow-md md:h-[15rem] rounded-md px-6 pt-5 md:pt-6 pb-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium sm:font-normal text-[0.9rem] md:text-[0.95rem] xl:text-[1.1rem]">
                {post.name}
              </p>
              <DeleteBtn postId={post.id} />
            </div>

            <hr className="mt-2 mb-3 md:mt-3 md:mb-4" />

            <div className="z-10 flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <p className="text-[0.8rem] md:text-[0.9rem] xl:text-[1rem] font-light break-words">
                  {post.content}
                </p>
              </div>

              <p className="font-light mt-3 self-end text-[0.6rem] xl:text-[0.7rem] text-[#bfbfbf]">
                {formatDateTime(post.created_at)}
              </p>
            </div>

            <WaveAni />
          </div>
        ))}
      </div>

      {hasNextPage && <div ref={ref} className="h-10" />}

      {isFetchingNextPage && <DotSpinner />}
    </>
  );
}
