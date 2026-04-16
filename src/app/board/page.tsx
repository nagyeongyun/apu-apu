import DeleteIcon from '/public/images/delete-icon.svg';
import { SCDream } from '@/font';
import WriteBtn from '@/components/board/WriteBtn';
import { getPosts } from '@/services/server/board';
import { PostInfo } from '@/types/board';
import { formatDateTime } from '@/utils/formatDate';

export default async function Board() {
  let posts: PostInfo[] = [];

  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Error pool info:', error);
  }

  return (
    <div className="px-14 py-8">
      <WriteBtn />
      <div className={`grid grid-cols-4 gap-10 ${SCDream.className}`}>
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col border border-gray-100 shadow-md h-[15rem] rounded-md px-6 pt-6 pb-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[1.1rem]">{post.name}</p>
              <button className="text-[#aaaaaa] hover:text-red-500">
                <DeleteIcon />
              </button>
            </div>
            <hr className="mt-3 mb-4" />
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <p className="text-[1rem] font-light break-words">
                  {post.content}
                </p>
              </div>
              <p className="mt-3 self-end text-[0.7rem] text-[#bfbfbf]">
                {formatDateTime(post.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
