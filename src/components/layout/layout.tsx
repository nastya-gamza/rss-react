import { ChangeEvent, useEffect, useState } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils';
import { Data } from '../../types';
import { Loader } from '../loader';
import { Error } from '../error';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { results = [] } = data;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const savedSearchQuery = getItemFromLocalStorage('searchQuery') || searchQuery;
    fetchByQuery(savedSearchQuery);
  };

  const handleClick = () => {
    setItemToLocalStorage('searchQuery', searchQuery);
    fetchByQuery(searchQuery);
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setError(false);
    setSearchQuery('');
    setItemToLocalStorage('searchQuery', '');
    fetchByQuery('');
  };

  const fetchByQuery = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchData<Data>(`${BASE_URL}/?${SEARCH_PARAM}=${searchQuery}`);
      setData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
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
        {!loading && !error && <Main results={results} />}
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
