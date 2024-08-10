import { useLocation, useNavigate, useSearchParams } from '@remix-run/react';
import { Pagination } from '../Pagination';
import { Data } from '../../types';
import { Flyout } from '../Flyout';
import { CardList } from '~/src/components/CardList/CardList';
import styles from './Main.module.css';

type MainProps = {
  pageData: Data;
};

export const Main = ({ pageData }: MainProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || 1;
  const name = searchParams.get('name') || '';
  const character = searchParams.get('character') || '';

  const totalPages = pageData ? pageData.info?.pages : 1;

  const handleNavigate = () => {
    if (character) {
      navigate(`?page=${currentPage}&name=${name}`);
    }
  };

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      navigate(`?page=${page}&name=${character}`);
    }
  };

  return (
    <section className={styles.main} onClick={handleNavigate}>
      <CardList results={pageData?.results} />
      {pageData?.results?.length > 0 && (
        <Pagination
          currentPage={Number(currentPage)}
          totalPages={totalPages}
          handleCurrentPage={handleCurrentPage}
        />
      )}
      <Flyout />
    </section>
  );
};
