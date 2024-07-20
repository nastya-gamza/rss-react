import { Character } from '../../types';
import { useNavigation } from '../../hooks';
import classNames from 'classnames';
import { Checkbox } from '../Checkbox/Checkbox.tsx';
import styles from './CardItem.module.css';

interface CardItemProps {
  character: Character;
}

export const CardItem = ({ character }: CardItemProps) => {
  const { pathname } = useNavigation();

  return (
    <li
      className={classNames(styles.card, {
        [styles.noHover]: pathname.includes('character'),
      })}
      data-testid='card-item'
    >
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
      <Checkbox character={character} />
    </li>
  );
};
