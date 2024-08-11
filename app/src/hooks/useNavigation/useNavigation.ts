import { useLocation, useSearchParams } from '@remix-run/react';

export const useNavigation = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const name = searchParams.get('name') || '';
  const character = searchParams.get('character') || '';

  const handleNavigate = () => {
    if (character) {
      setSearchParams({ page: currentPage, name });
    }
  };

  const handleCurrentPage = (currentPage: number) => {
    if (pathname === '/') {
      setSearchParams({ page: String(currentPage), name });
    }
  };

  return {
    name,
    currentPage,
    searchParams,
    setSearchParams,
    handleNavigate,
    handleCurrentPage,
  };
};
