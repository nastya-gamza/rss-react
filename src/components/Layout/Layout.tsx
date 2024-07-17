import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { Header } from '../Header';
import { Main } from '../Main';
import { useSearchQuery, useNavigation } from '../../hooks';
import { setItemToLocalStorage } from '../../utils';
import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import styles from './Layout.module.css';
import { useGetAllCharactersQuery } from '../../store/api/characters-api.ts';

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [totalPages, setTotalPages] = useState(0);

  const {
    handleNavigate,
    handleCurrentPage,
    currentPage,
    setCurrentPage,
    navigate,
    pathname,
  } = useNavigation();

  const { data, isLoading, isError, refetch } = useGetAllCharactersQuery({
    name: searchQuery,
    page: currentPage,
  });

  const handleClick = async () => {
    setItemToLocalStorage('searchQuery', searchQuery);
    await refetch(searchQuery, 1);
    setCurrentPage(1);
    navigate(`/?page=${1}`);
  };

  useEffect(() => {
    if (data?.info?.pages) {
      setTotalPages(data.info.pages);
    }
  }, [data?.info?.pages]);

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.main, {
          [styles.blur]: pathname.includes('character'),
        })}
        onClick={handleNavigate}
      >
        <Header
          handleClick={handleClick}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Main loading={isLoading} error={isError}>
          {data?.results && (
            <CardList results={data?.results} currentPage={currentPage} />
          )}
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
