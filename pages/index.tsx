/* eslint-disable react-refresh/only-export-components */
import { Flyout } from '../src/components/Flyout';
import { useAppDispatch, useAppSelector } from '../src/hooks';
import { useRouter } from 'next/router';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../src/store/slices/checkedCharactersSlice.ts';
import { CardList } from '../src/components/CardList/CardList.tsx';
import { Pagination } from '../src/components/Pagination';
import styles from '../src/components/Main/Main.module.css';
import { GetServerSideProps } from 'next';
import { BASE_URL } from '../src/constants/api.ts';
import { Data } from '../src/types';

type MainProps = {
  pageData: Data;
};

const Main = ({ pageData }: MainProps) => {
  const dispatch = useAppDispatch();
  const { query, pathname, push } = useRouter();

  const checkedCharacters = useAppSelector(checkedCharactersSelector);

  const currentPage = query.page ? Number(query.page) : 1;
  const name = typeof query.name === 'string' ? query.name : '';

  const totalPages = pageData ? pageData.info?.pages : 1;

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      push(`?page=${page}&name=${name}`);
    }
  };

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  return (
    <>
      <main className={styles.container}>
        {pageData && <CardList results={pageData?.results} />}
        {pageData?.results && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleCurrentPage={handleCurrentPage}
          />
        )}
        <Flyout items={checkedCharacters} onClick={handleUncheck} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, name } = context.query;
  const currentPage = page ? Number(page) : 1;
  const searchName = typeof name === 'string' ? name : '';
  // const id = Number(character);
  // const res = await fetch(`${BASE_URL}/${id}`);
  // const data: Character = await res.json();

  // const name = '';
  const getPageData = await fetch(
    `${BASE_URL}/?name=${searchName}&page=${currentPage}`,
  );
  const pageData = await getPageData.json();

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pageData },
  };
};

export default Main;
