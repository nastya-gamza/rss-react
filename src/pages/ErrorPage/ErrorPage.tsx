import { Error } from '../../components/Error';
import styles from './ErrorPage.module.css';
import { useRouter } from 'next/router';

export const ErrorPage = () => {
  const { push } = useRouter();

  const handleNavigate = () => push('/');

  return (
    <div className={styles.error}>
      <Error
        message={'404 | Page not found'}
        btnText={'Back home'}
        handleRefresh={handleNavigate}
      />
    </div>
  );
};
