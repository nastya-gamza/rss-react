import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { Header } from '../Header';
import { Main } from '../Main';
import { useSearchQuery, useNavigation } from '../../hooks';
import { setItemToLocalStorage } from '../../utils';
import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { useLazyGetAllCharactersQuery } from '../../store/api/characters-api.ts';
import { useAppSelector } from '../../hooks/useRedux.ts';
import styles from './Layout.module.css';

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [totalPages, setTotalPages] = useState(0);

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

  const checkedCharacters = useAppSelector((state) => state.selectedCharacters);
  console.log(checkedCharacters);

  const handleClick = async () => {
    setItemToLocalStorage('searchQuery', searchQuery);
    await getCharactersData({ name: searchQuery, page: 1 });
    setCurrentPage(1);
    navigate(`/?page=${1}`);
  };

  useEffect(() => {
    getCharactersData({ name: searchQuery, page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    if (charactersData?.info?.pages) {
      setTotalPages(charactersData.info.pages);
    }
  }, [charactersData?.info?.pages]);

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
        <Main loading={isFetching} error={isError}>
          {charactersData?.results && (
            <CardList results={charactersData?.results} />
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
