import { SCDream } from '@/font';
import { getPosts } from '@/services/server/board';
import { PostInfo } from '@/types/board';
import { formatDateTime } from '@/utils/formatDate';
import DeleteBtn from '@/components/board/DeleteBtn';
import WriteBtn from '@/components/board/WriteBtn';

export default async function Board() {
  let posts: PostInfo[] = [];

  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Error pool info:', error);
  }

  return (
    <div className="px-6 xl:px-14 py-6 md:py-8">
      <WriteBtn />
      <div
        className={`grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-5 xl:gap-10 ${SCDream.className}`}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col border border-gray-100 shadow-md md:h-[12rem] xl:h-[15rem] rounded-md px-6 pt-5 md:pt-6 pb-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium sm:font-normal text-[0.9rem] md:text-[0.95rem] xl:text-[1.1rem]">
                {post.name}
              </p>
              <DeleteBtn postId={post.id} />
            </div>
            <hr className="mt-2 mb-3 md:mt-3 md:mb-4" />
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <p className="text-[0.8rem] md:text-[0.9rem] xl:text-[1rem] font-light break-words">
                  {post.content}
                </p>
              </div>
              <p className="font-light mt-3 self-end text-[0.6rem] xl:text-[0.7rem] text-[#bfbfbf]">
                {formatDateTime(post.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
