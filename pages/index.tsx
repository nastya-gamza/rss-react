/* eslint-disable react-refresh/only-export-components */
import { Flyout } from '../src/components/Flyout';
import { useAppDispatch, useAppSelector } from '../src/hooks';
import { useRouter } from 'next/router';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../src/store/slices/checkedCharactersSlice.ts';
import {
  charactersApi,
  getRunningQueriesThunk,
  useGetAllCharactersQuery,
} from '../src/store/api/charactersApi.ts';
import { Error } from '../src/components/Error';
import { CardList } from '../src/components/CardList/CardList.tsx';
import { Pagination } from '../src/components/Pagination';
import { wrapper } from '../src/store/store.ts';
import styles from '../src/components/Main/Main.module.css';

const Main = () => {
  const dispatch = useAppDispatch();
  const { query, pathname, push } = useRouter();

  const checkedCharacters = useAppSelector(checkedCharactersSelector);

  const currentPage = query.page ? Number(query.page) : 1;
  const name = typeof query.name === 'string' ? query.name : '';

  const { data, isError } = useGetAllCharactersQuery({
    name: query.name as string,
    page: currentPage,
  });

  const totalPages = data ? data.info?.pages : 1;

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      push(`?page=${page}&name=${name}`);
    }
  };

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  if (isError) {
    return <Error message={'An error occurred. Please try again later.'} />;
  }

  return (
    <>
      {/*{isError && <Error message={'Nothing was found :(️'} />}*/}
      <main className={styles.container}>
        {data && <CardList results={data.results} />}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleCurrentPage={handleCurrentPage}
        />
        <Flyout items={checkedCharacters} onClick={handleUncheck} />
      </main>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log(context.res.statusMessage);
    const { page, name } = context.query;
    const currentPage = page ? Number(page) : 1;
    const searchName = typeof name === 'string' ? name : '';

    await store.dispatch(
      charactersApi.endpoints?.getAllCharacters.initiate({
        name: searchName,
        page: currentPage,
      }),
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);
export default Main;
