import { Header } from '../Header';
import { ReactNode } from 'react';
import styles from './Layout.module.css';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
