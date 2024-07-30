import Link from 'next/link';
import { CardItem } from '../CardItem';
import { Character } from '../../types';
import { useAppSelector } from '../../hooks';
import { currentPageDataSelector } from '../../store/slices/currentPageDataSlice.ts';
import styles from './CardList.module.css';
import { useRouter } from 'next/router';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const { currentPage: storedCurrentPage } = useAppSelector(
    currentPageDataSelector,
  );
  const { query } = useRouter();
  const page = query.page ? Number(query.page) : null;
  const currentPage = page ?? storedCurrentPage;

  return (
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
  );
};
