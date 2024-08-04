import { Header } from '../Header';
import { ThemeContext } from '../../context/theme/themeContext.ts';
import { ReactNode, useContext } from 'react';
import styles from './Layout.module.css';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.wrapper} data-theme={theme} data-testid={theme}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
