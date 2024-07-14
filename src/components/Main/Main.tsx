import { ReactNode } from 'react';
import { Loader } from '../Loader';
import { Error } from '../Error';
import styles from './Main.module.css';

interface MainProps {
  children: ReactNode;
  loading: boolean;
  error: boolean;
}

export const Main = ({ children, loading, error }: MainProps) => (
  <>
    {loading && <Loader />}
    {error && <Error message={'Nothing was found ☹️'} />}
    {!loading && !error && <main className={styles.container}>{children}</main>}
  </>
);
