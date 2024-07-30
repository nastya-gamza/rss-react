import classNames from 'classnames';
import { Header } from '../Header';
import { Main } from '../Main';
import { ThemeContext } from '../../context/theme/themeContext.ts';
import { ReactNode, useContext } from 'react';
import styles from './Layout.module.css';
import { useRouter } from 'next/router';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const { pathname, push, query } = useRouter();

  const page = query.page ? Number(query.page) : null;

  const handleNavigate = async () => {
    if (pathname !== '/') {
      await push(`/?page=${page}`);
    }
  };

  return (
    <div className={styles.wrapper} data-theme={theme} data-testid={theme}>
      <div className={styles.wrapper} onClick={handleNavigate}>
        <div
          className={classNames(styles.main, {
            [styles.blur]: pathname.includes('character'),
          })}
        >
          <Header />
          <Main />
        </div>
      </div>
      <div className={styles.outlet}>{children}</div>
    </div>
  );
};
