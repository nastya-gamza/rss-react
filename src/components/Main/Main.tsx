import { CardList } from '../CardList/CardList.tsx';
import { Pagination } from '../Pagination';
import { useAppDispatch, useAppSelector, useNavigation } from '../../hooks';
import { Data } from '../../types';
import { Flyout } from '../Flyout';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../../store/slices/checkedCharactersSlice.ts';
import styles from './Main.module.css';

type MainProps = {
  pageData: Data;
};

export const Main = ({ pageData }: MainProps) => {
  const dispatch = useAppDispatch();
  const checkedCharacters = useAppSelector(checkedCharactersSelector);
  const { currentPage, handleNavigate, handleCurrentPage } = useNavigation();
  const totalPages = pageData ? pageData.info?.pages : 1;

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  return (
    <section className={styles.main} onClick={handleNavigate}>
      <CardList results={pageData?.results} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleCurrentPage={handleCurrentPage}
      />
      <Flyout items={checkedCharacters} onClick={handleUncheck} />
    </section>
  );
};
