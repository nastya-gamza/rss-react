import { CardItem } from '../CardItem';
import { Character } from '../../types';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { currentPageDataSelector } from '../../store/slices/current-page-data-slice.ts';
import styles from './CardList.module.css';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const { currentPage } = useAppSelector(currentPageDataSelector);

  return (
    <ul className={styles.list}>
      {results.map((character) => (
        <Link
          to={`/character/${character.id}/?page=${currentPage}`}
          key={character.id}
        >
          <CardItem character={character} />
        </Link>
      ))}
    </ul>
  );
};
