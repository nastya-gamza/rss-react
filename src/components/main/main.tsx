import { CardItem } from '../card-item/card-item.tsx';
import { Character } from '../../types';
import styles from './main.module.css';

interface MainProps {
  results: Character[];
}

export const Main = ({ results }: MainProps) => {
  return (
    <main className={styles.container}>
      <ul className={styles.list}>
        {results.map((character) => (
          <CardItem key={character.id} character={character} />
        ))}
      </ul>
    </main>
  );
};
