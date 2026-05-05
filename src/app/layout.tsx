import type { Metadata } from 'next';
import ReactQueryProviders from './ReactQueryProviders';
import './globals.css';
import { pretendard } from '@/font';
import Nav from '@/components/layout/Nav';
import SideBar from '@/components/layout/SideBar';

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
      <body className="h-screen [height:100dvh] w-full">
        <main className="h-full w-full flex flex-col">
          <Nav />
          <div className="flex flex-1">
            <div className="hidden shrink-0 md:block lg:w-[200px] 2xl:w-[220px] h-full">
              <SideBar />
            </div>
            <div className="flex-1 min-w-0">
              <ReactQueryProviders>{children}</ReactQueryProviders>
              <div id="modal-root"></div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
