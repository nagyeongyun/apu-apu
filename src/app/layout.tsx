import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/layout/Nav';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '어푸어푸',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className="h-screen [height:100dvh] w-screen">
        <main className="h-full w-full flex flex-col">
          <Nav />
          <div className="flex-1">
            {children}
            <div id="modal-root"></div>
          </div>
        </main>
      </body>
    </html>
  );
}
