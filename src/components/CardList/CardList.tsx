import { CardItem } from '../CardItem';
import { Character } from '../../types';
import styles from '../Main/Main.module.css';

interface CardListProps {
  results: Character[];
}

export const CardList = ({ results }: CardListProps) => (
  <ul className={styles.list}>
    {results.map((character) => (
      <CardItem character={character} />
    ))}
  </ul>
);
