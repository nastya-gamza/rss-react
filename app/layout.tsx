import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Header } from '../src/components/Header';
import { StoreProvider } from '../src/store/StoreProvider';
import { ThemeProvider } from '../src/context/theme/themeProvider';
import '../src/styles/global.css';

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
      <ThemeProvider>
        <html lang='en'>
          <body>
            <Header />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </StoreProvider>
  );
}
