import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { Data } from '../../types';
import { Flyout } from '../Flyout';
import { fetchData } from '../../api';
import { BASE_URL } from '../../constants/api.ts';
import styles from './Main.module.css';

type MainProps = {
  searchParams: {
    page?: string;
    name?: string;
    character?: string;
  };
};

export const Main = async ({ searchParams }: MainProps) => {
  const { page, name } = searchParams;

  const currentPage = page ? Number(page) : 1;
  const searchName = typeof name === 'string' ? name : '';

  const pageData = await fetchData<Data>(
    `${BASE_URL}/?name=${searchName}&page=${currentPage}`,
  );

  const totalPages = pageData ? pageData.info?.pages : 1;

  return (
    pageData && (
      <section className={styles.main}>
        <CardList results={pageData?.results} />
        <Pagination totalPages={totalPages} />
        <Flyout />
      </section>
    )
  );
};
