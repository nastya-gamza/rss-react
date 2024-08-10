import { Link } from '@remix-run/react';
import { useSearchParams } from '@remix-run/react';
import { CardItem } from '../CardItem';
import { Character } from '../../types';
import styles from './CardList.module.css';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');

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
