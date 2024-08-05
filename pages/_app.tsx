import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/store/store.ts';
import { ThemeProvider } from '../src/context/theme/themeProvider.tsx';
import { Layout } from '../src/components/Layout';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from '../src/components/Loader';
import '../src/styles/global.css';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startRoute = () => {
      setIsLoading(true);
    };

    const endRoute = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', startRoute);
    router.events.on('routeChangeComplete', endRoute);
    router.events.on('routeChangeError', endRoute);

    return () => {
      router.events.off('routeChangeStart', startRoute);
      router.events.off('routeChangeComplete', endRoute);
      router.events.off('routeChangeError', endRoute);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <title>Rick & Morty</title>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <Layout>
              {isLoading ? <Loader /> : <Component {...pageProps} />}
            </Layout>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </>
  );
};

export default App;
