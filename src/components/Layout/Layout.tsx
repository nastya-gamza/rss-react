import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Main } from '../Main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { Data } from '../../types';
import { useSearchQuery, useFetch, useNavigation } from '../../hooks';
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
  const [totalPages, setTotalPages] = useState(0);

  const { results = [] } = data;

  const [fetching, isLoading, isError] = useFetch(
    async (searchQuery: string, currentPage: number) => {
      const data = await fetchData<Data>(
        `${BASE_URL}/?${SEARCH_PARAM}=${searchQuery}&page=${currentPage}`,
      );
      setData(data);
      setTotalPages(data.info.pages);
    },
  );

  const { handleNavigate, handleCurrentPage, currentPage, setCurrentPage, navigate } =
    useNavigation();

  const handleClick = () => {
    setItemToLocalStorage('searchQuery', searchQuery as string);
    fetching(searchQuery as string, 1);
    setCurrentPage(1);
    navigate(`/?page=${1}`);
  };

  useEffect(() => {
    fetching(searchQuery as string, currentPage);
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main} onClick={handleNavigate}>
        <Header>
          <SearchInput
            searchQuery={searchQuery as string}
            handleClick={handleClick}
            setSearchQuery={setSearchQuery}
          />
        </Header>
        <Main loading={isLoading} error={isError}>
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
