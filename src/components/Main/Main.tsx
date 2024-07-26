import { Loader } from '../Loader';
import { Error } from '../Error';
import { useGetAllCharactersQuery } from '../../store/api/characters-api.ts';
import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigation } from '../../hooks';
import {
  currentPageDataSelector,
  setCurrentPageNumber,
} from '../../store/slices/current-page-data-slice.ts';
import { Flyout } from '../Flyout';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../../store/slices/checked-characters-slice.ts';
import styles from './Main.module.css';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { page, pathname, navigate } = useNavigation();

  const checkedCharacters = useAppSelector(checkedCharactersSelector);
  const { searchQuery } = useAppSelector(currentPageDataSelector);
  const { currentPage: storedCurrentPage } = useAppSelector(
    currentPageDataSelector,
  );

  const currentPage = page ?? storedCurrentPage;

  const {
    data: charactersData,
    isFetching,
    isError,
  } = useGetAllCharactersQuery({ name: searchQuery, page: currentPage });

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      dispatch(setCurrentPageNumber(page));
      navigate(`?page=${page}`);
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
