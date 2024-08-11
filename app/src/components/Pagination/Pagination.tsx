import classNames from 'classnames';
import { usePagination } from '../../hooks';
import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleCurrentPage: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  handleCurrentPage,
}: PaginationProps) => {
  const { arrayOfPagesNumber, handlePrevPage, handleNextPage } = usePagination(
    currentPage,
    totalPages,
    handleCurrentPage,
  );

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button className={styles.arrowBtn} onClick={handlePrevPage}>
          {'<'}
        </button>
      )}
      {arrayOfPagesNumber.map((page) => (
        <button
          key={page}
          onClick={() => handleCurrentPage(page)}
          className={classNames(styles.paginationBtn, {
            [styles.activeBtn]: page === currentPage,
          })}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button className={styles.arrowBtn} onClick={handleNextPage}>
          {'>'}
        </button>
      )}
    </div>
  );
};
