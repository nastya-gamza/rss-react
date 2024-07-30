import type { AppProps } from 'next/app';
import '../src/styles/main.css';
import { ThemeProvider } from '../src/context/theme/themeProvider.tsx';
import { store } from '../src/store/store.ts';
import { Provider } from 'react-redux';
import { Layout } from '../src/components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
