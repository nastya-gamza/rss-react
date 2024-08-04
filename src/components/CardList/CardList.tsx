import { useRouter } from 'next/router';
import { CardItem } from '../CardItem';
import { Error } from '../Error';
import { Character } from '../../types';
import styles from './CardList.module.css';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const { query, push } = useRouter();
  const characterName = query.name ?? '';
  const currentPage = query.page ? Number(query.page) : 1;

  const handleNavigate = (id: number) => {
    if (!query.character) {
      push(`?page=${currentPage}&name=${characterName}&character=${id}`);
    }
  };

  return results ? (
    <ul className={styles.list}>
      {results.map((character) => (
        <li onClick={() => handleNavigate(character.id)} key={character.id}>
          <CardItem character={character} />
        </li>
      ))}
    </ul>
  ) : (
    <Error message={'Nothing was found :(️'} />
  );
};
