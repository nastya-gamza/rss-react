import { Pagination } from '../Pagination';
import { Data } from '../../types';
import { Flyout } from '../Flyout';
import { useNavigation } from '../../hooks';
import { CardList } from '../CardList';
import styles from './Main.module.css';

type MainProps = {
  pageData: Data;
};

export const Main = ({ pageData }: MainProps) => {
  const { currentPage, handleNavigate, handleCurrentPage } = useNavigation();

  const totalPages = pageData ? pageData.info?.pages : 1;

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
