import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export const useNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const pageString = searchParams.get('page');
  const page = pageString ? parseInt(pageString) : null;
  const [currentPage, setCurrentPage] = useState(page ?? 1);

  const handleNavigate = () => {
    if (pathname !== '/') {
      navigate(`/?page=${page}`);
    }
  };

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      setCurrentPage(page);
      navigate(`?page=${page}`);
    }
  };

  return { handleNavigate, handleCurrentPage, currentPage, setCurrentPage, navigate, pathname };
};
