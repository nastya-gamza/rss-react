import { Error } from '../../components/Error';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/');

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
