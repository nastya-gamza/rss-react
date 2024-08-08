import { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../src/styles/global.css';
import { Header } from '../src/components/Header';
import { StoreProvider } from '../src/store/StoreProvider';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Rick & Morty',
  // icons: [
  //   {
  //     url: '/logo.svg',
  //     href: '/logo.svg',
  //   }
  // ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='en'>
        <body data-theme='light'>
          <Header />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
