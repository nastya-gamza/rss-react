import Link from 'next/link';
import { useRouter } from 'next/router';
import { CardItem } from '../CardItem';
import { Error } from '../Error';
import { Character } from '../../types';
import styles from './CardList.module.css';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const { page } = useRouter().query;
  const currentPage = page ? Number(page) : 1;

  return results ? (
    <ul className={styles.list}>
      {results.map((character) => (
        <Link
          href={`/characters/${character.id}/?page=${currentPage}`}
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
