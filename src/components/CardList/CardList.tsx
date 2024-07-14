import { Link } from 'react-router-dom';
import { CardItem } from '../CardItem';
import { Character } from '../../types';
import styles from '../Main/Main.module.css';

interface CardListProps {
  results: Character[];
  currentPage: number;
}

export const CardList = ({ results, currentPage }: CardListProps) => (
  <ul className={styles.list}>
    {results.map((character) => (
      <Link to={`/character/${character.id}/?page=${currentPage}`} key={character.id}>
        <CardItem character={character} />
      </Link>
    ))}
  </ul>
);
