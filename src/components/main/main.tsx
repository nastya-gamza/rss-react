import { CardItem } from '../card-item';
import { Character } from '../../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from '../pagination';
import styles from './main.module.css';

interface MainProps {
  results: Character[];
  currentPage: number;
  setCurrentPage: (a: number) => void;
}

export const Main = ({ results, totalPages, currentPage, setCurrentPage }: MainProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      setCurrentPage(page);
      navigate(`?page=${page}`);
    }
  };

  return (
    <main className={styles.container}>
      <ul className={styles.list}>
        {results.map((character) => (
          <Link to={`/character/?character=${character.id}&page=${currentPage}`} key={character.id}>
            <CardItem character={character} />
          </Link>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleCurrentPage={handleCurrentPage}
        />
      )}
    </main>
  );
};
