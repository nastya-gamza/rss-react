import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../src/context/theme/themeProvider.tsx';
import { wrapper } from '../src/store/store.ts';
import { Layout } from '../src/components/Layout';
import '../src/styles/global.css';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

const App = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
