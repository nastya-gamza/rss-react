import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { useNavigation } from '../../hooks';
import { Data } from '../../types';
import { Flyout } from '../Flyout';
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleCurrentPage={handleCurrentPage}
      />
      <Flyout />
    </section>
  );
};
