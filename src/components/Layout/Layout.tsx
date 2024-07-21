import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { Header } from '../Header';
import { Main } from '../Main';
import { useSearchQuery, useNavigation } from '../../hooks';
import { setItemToLocalStorage } from '../../utils';
import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { useLazyGetAllCharactersQuery } from '../../store/api/characters-api.ts';
import styles from './Layout.module.css';

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');

  const {
    currentPage,
    navigate,
    pathname,
    handleNavigate,
    handleCurrentPage,
    setCurrentPage,
  } = useNavigation();

  const [getCharactersData, { data: charactersData, isFetching, isError }] =
    useLazyGetAllCharactersQuery();

  const handleClick = async () => {
    setItemToLocalStorage('searchQuery', searchQuery);
    await getCharactersData({ name: searchQuery, page: 1 });
    setCurrentPage(1);
    navigate(`/?page=${1}`);
  };

  useEffect(() => {
    getCharactersData({ name: searchQuery, page: currentPage });
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper} onClick={handleNavigate}>
        <div
          className={classNames(styles.main, {
            [styles.blur]: pathname.includes('character'),
          })}
        >
          <Header
            handleClick={handleClick}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Main loading={isFetching} error={isError}>
            {charactersData?.results && (
              <CardList
                results={charactersData?.results}
                currentPage={currentPage}
              />
            )}
            <Pagination
              currentPage={currentPage}
              handleCurrentPage={handleCurrentPage}
            />
          </Main>
        </div>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
