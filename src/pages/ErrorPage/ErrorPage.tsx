import { Error } from '../../components/Error';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/');

  return (
    <div className={'error'}>
      <Error
        message={'Oops! 404 | Page not found'}
        btnText={'Back home'}
        handleRefresh={handleNavigate}
      />
    </div>
  );
};
