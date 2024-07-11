import classNames from 'classnames';
import ArrowIcon from '/public/icons/arrow.svg?react';
import { usePagination } from '../../hooks/usePagination.ts';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleCurrentPage: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, handleCurrentPage }: PaginationProps) => {
  const { arrayOfPagesNumber, handlePrevPage, handleNextPage } = usePagination(
    currentPage,
    totalPages,
    handleCurrentPage,
  );

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button className={styles.arrowBtn} onClick={handlePrevPage}>
          <ArrowIcon />
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
        <button
          className={classNames(styles.arrowBtn, styles.arrowBtnNext)}
          onClick={handleNextPage}
        >
          <ArrowIcon />
        </button>
      )}
    </div>
  );
};
