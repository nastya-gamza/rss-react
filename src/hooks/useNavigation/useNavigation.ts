import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();
  const pageString = searchParams.get('page');
  const page = pageString ? parseInt(pageString) : null;

  const handleNavigate = () => {
    if (pathname !== '/') {
      navigate(`/?page=${page}`);
    }
  };

  return {
    page,
    handleNavigate,
    navigate,
    pathname,
  };
};
