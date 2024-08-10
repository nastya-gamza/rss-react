import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Header } from '~/src/components/Header';
import { Provider } from 'react-redux';
import { store } from '~/src/store/store';
import { ThemeProvider } from '~/src/context/theme/themeProvider';
import './src/styles/main.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Rick & Morty</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
}
