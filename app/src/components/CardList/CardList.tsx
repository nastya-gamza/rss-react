import { Link } from '@remix-run/react';
import { useSearchParams } from '@remix-run/react';
import { CardItem } from '../CardItem';
import { Error } from '../Error';
import { Character } from '../../types';
import styles from './CardList.module.css';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const name = searchParams.get('name') || '';

  return results ? (
    <ul className={styles.list}>
      {results.map((character) => (
        <Link
          to={`/?page=${currentPage}&name=${name}&character=${character.id}`}
          key={character.id}
        >
          <CardItem character={character} />
        </Link>
      ))}
    </ul>
  ) : (
    <Error message={'Nothing was found :(️'} />
  );
};
