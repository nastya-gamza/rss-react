import { Character } from '../../types';
import styles from './CardItem.module.css';

interface CardItemProps {
  character: Character;
}

export const CardItem = ({ character }: CardItemProps) => (
  <li className={styles.card}>
    <div className={styles.img}>
      <img src={character?.image} alt={`${character.name}'s image`} />
    </div>
    <div className={styles.info}>
      <h3>{character?.name}</h3>
      <p>
        <b>Species: </b>
        {character?.species}
      </p>
      <p>
        <b>Location: </b>
        {character?.location.name}
      </p>
    </div>
  </li>
);
