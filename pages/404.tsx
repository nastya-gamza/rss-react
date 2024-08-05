import { useRouter } from 'next/router';
import { Error } from '../src/components/Error';
import styles from '../src/styles/ErrorPage.module.css';

const ErrorPage = () => {
  const { push } = useRouter();

  const handleNavigateHome = () => push('/');

  return (
    <div className={styles.error}>
      <Error
        message={'404 | Page not found'}
        btnText={'Back home'}
        handleRefresh={handleNavigateHome}
      />
    </div>
  );
};

export default ErrorPage;
