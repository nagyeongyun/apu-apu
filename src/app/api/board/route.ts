import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, password, content } = body;

    const trimmedName = name?.trim();
    const trimmedPassword = password?.trim();
    const trimmedContent = content?.trim();

    if (!trimmedName || !trimmedPassword || !trimmedContent) {
      return NextResponse.json(
        { error: '닉네임, 비밀번호, 내용을 모두 입력해주세요.' },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(trimmedPassword, 10);

    const supabase = await createClient();

    const { error } = await supabase.from('posts').insert({
      name: trimmedName,
      content: trimmedContent,
      password_hash: passwordHash,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: '게시글이 등록되었습니다.' },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
