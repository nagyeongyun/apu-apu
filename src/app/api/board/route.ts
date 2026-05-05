import { NextResponse, NextRequest } from 'next/server';
import { getPostsPage } from '@/services/server/board';

export async function GET(request: NextRequest) {
  const pageParam = request.nextUrl.searchParams.get('page');
  const page = Number(pageParam ?? '1');

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json(
      { error: '유효한 page 값이 필요합니다.' },
      { status: 400 },
    );
  }

  try {
    const result = await getPostsPage(page);

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '게시글 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
