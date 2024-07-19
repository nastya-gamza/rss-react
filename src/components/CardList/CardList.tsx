import { CardItem } from '../CardItem';
import { Character } from '../../types';
import styles from './CardList.module.css';
import { Flyout } from '../Flyout';

interface CardListProps {
  results: Character[];
}

export const CardList = ({ results }: CardListProps) => (
  <>
    <ul className={styles.list}>
      {results.map((character) => (
        <CardItem key={character.id} character={character} />
      ))}
    </ul>
    <Flyout />
  </>
);
