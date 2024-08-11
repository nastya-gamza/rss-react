import { Link } from '@remix-run/react';
import { CardItem } from '../CardItem';
import { Error } from '../Error';
import { Character } from '../../types';
import styles from './CardList.module.css';
import { useNavigation } from '~/src/hooks';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const { currentPage, name } = useNavigation();

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
