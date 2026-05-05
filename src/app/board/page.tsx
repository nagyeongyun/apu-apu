import { getPostsPage } from '@/services/server/board';
import WriteBtn from '@/components/board/WriteBtn';
import PostList from '../../components/board/PostList';

export default async function Board() {
  const initialPage = await getPostsPage(1);

  return (
    <div className="px-6 xl:px-12 py-6 md:py-8">
      <WriteBtn />
      <PostList initialPage={initialPage} />
    </div>
  );
}
