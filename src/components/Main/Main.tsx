import { Loader } from '../Loader';
import { Error } from '../Error';
import { useGetAllCharactersQuery } from '../../store/api/characters-api.ts';
import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.ts';
import { useNavigation } from '../../hooks';
import { setCurrentPageNumber } from '../../store/slices/current-page-data-slice.ts';
import styles from './Main.module.css';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { pathname, navigate } = useNavigation();

  const searchQuery = useAppSelector((state) => state.currentPage.query);
  const currentPage = useAppSelector((state) => state.currentPage.currentPage);

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

  return (
    <>
      {isFetching && <Loader />}
      {isError && <Error message={'Nothing was found ☹️'} />}
      {!isFetching && !isError && (
        <main className={styles.container}>
          {charactersData?.results && (
            <CardList results={charactersData?.results} />
          )}
          <Pagination
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
          />
        </main>
      )}
    </>
  );
};
