import { Loader } from '../Loader';
import { Error } from '../Error';
import { useGetAllCharactersQuery } from '../../store/api/charactersApi.ts';
import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  currentPageDataSelector,
  setCurrentPageNumber,
} from '../../store/slices/currentPageDataSlice.ts';
import { Flyout } from '../Flyout';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../../store/slices/checkedCharactersSlice.ts';
import styles from './Main.module.css';
import { useRouter } from 'next/router';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { query, pathname, push } = useRouter();

  const checkedCharacters = useAppSelector(checkedCharactersSelector);
  const { searchQuery } = useAppSelector(currentPageDataSelector);
  const { currentPage: storedCurrentPage } = useAppSelector(
    currentPageDataSelector,
  );

  const page = query.page ? Number(query.page) : null;
  const currentPage = page ?? storedCurrentPage;

  const {
    data: charactersData,
    isFetching,
    isError,
  } = useGetAllCharactersQuery({
    name: searchQuery,
    page: currentPage,
  });

  const handleCurrentPage = async (page: number) => {
    if (pathname === '/') {
      dispatch(setCurrentPageNumber(page));
      await push(`?page=${page}`);
    }
  };

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  return (
    <>
      {isFetching && <Loader />}
      {isError && <Error message={'Nothing was found :(️'} />}
      {!isFetching && !isError && (
        <main className={styles.container}>
          {charactersData?.results && (
            <CardList results={charactersData?.results} />
          )}
          <Pagination
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
          />
          <Flyout items={checkedCharacters} onClick={handleUncheck} />
        </main>
      )}
    </>
  );
};
