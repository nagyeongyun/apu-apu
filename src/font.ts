import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

export const SCDream = localFont({
  src: [
    {
      path: '../public/fonts/SCDream3.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SCDream4.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SCDream5.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
});
