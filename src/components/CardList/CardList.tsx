import { CardItem } from '../CardItem';
import { Character } from '../../types';
import styles from './CardList.module.css';
import { Flyout } from '../Flyout';
import { Link } from 'react-router-dom';

interface CardListProps {
  results: Character[];
}

export const CardList = ({ results, currentPage }: CardListProps) => (
  <>
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
    <Flyout />
  </>
);
