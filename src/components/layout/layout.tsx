import { ChangeEvent, useEffect, useState } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { Data } from '../../types';
import { Loader } from '../loader';
import { Error } from '../error';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './layout.module.css';
import { useSearchQuery } from '../../hooks/useSearchQuery.ts';
import { setItemToLocalStorage } from '../../utils';

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleClick = () => {
    setItemToLocalStorage('searchQuery', searchQuery);
    fetchByQuery(searchQuery, 1);
    setCurrentPage(1);
    navigate(`/?page=${1}`);
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setError(false);
    setSearchQuery('');
    setItemToLocalStorage('searchQuery', '');
    fetchByQuery('', 1);
  };

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

  const handleNavigate = () => {
    if (pathname !== '/') {
      navigate(`/?page=${page}`);
    }
  };

  useEffect(() => {
    fetchByQuery(searchQuery, currentPage);
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main} onClick={handleNavigate}>
        <Header
          searchQuery={searchQuery}
          handleClick={handleClick}
          handleInputChange={handleInputChange}
        />
        {loading && <Loader />}
        {error && (
          <Error
            message={'Oops! Nothing was found ☹️'}
            btnText={'Try again'}
            handleRefresh={handleRefresh}
          />
        )}
        {!loading && !error && (
          <Main
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            results={results}
          />
        )}
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
