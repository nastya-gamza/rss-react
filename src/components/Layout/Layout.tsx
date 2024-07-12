import { ChangeEvent, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../Header';
import { Main } from '../Main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { Data } from '../../types';
import { useSearchQuery } from '../../hooks/useSearchQuery.ts';
import { setItemToLocalStorage } from '../../utils';
import { SearchInput } from '../SearchInput';
import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import styles from './Layout.module.css';

export const Layout = () => {
  const [data, setData] = useState<Data>({
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  });
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { results = [] } = data;
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(parseInt(page ?? 1));

  const fetchByQuery = async (searchQuery: string, currentPage: number) => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchData<Data>(
        `${BASE_URL}/?${SEARCH_PARAM}=${searchQuery}&page=${currentPage}`,
      );
      setData(data);
      setTotalPages(data.info.pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = () => {
    setItemToLocalStorage('searchQuery', searchQuery);
    fetchByQuery(searchQuery, 1);
    setCurrentPage(1);
    navigate(`/?page=${1}`);
  };

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

  useEffect(() => {
    fetchByQuery(searchQuery, currentPage);
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main} onClick={handleNavigate}>
        <Header>
          <SearchInput
            searchQuery={searchQuery}
            handleClick={handleClick}
            handleInputChange={handleInputChange}
          />
        </Header>
        <Main loading={loading} error={error}>
          <CardList results={results} currentPage={currentPage} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleCurrentPage={handleCurrentPage}
            />
          )}
        </Main>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
