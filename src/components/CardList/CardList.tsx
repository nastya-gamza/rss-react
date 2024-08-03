import Link from 'next/link';
import { useRouter } from 'next/router';
import { CardItem } from '../CardItem';
import { Character } from '../../types';
import styles from './CardList.module.css';
import { useAppSelector } from '../../hooks';
import { currentPageDataSelector } from '../../store/slices/currentPageDataSlice.ts';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const { page } = useRouter().query;
  const currentPage = page ? Number(page) : 1;
  const res = useAppSelector(currentPageDataSelector);
  console.log(res);

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
