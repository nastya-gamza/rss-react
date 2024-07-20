import { Character } from '../../types';
import styles from './CardItem.module.css';
import { useNavigation } from '../../hooks';
import classNames from 'classnames';
import { Checkbox } from '../Checkbox/Checkbox.tsx';
import { setCheckedCharacters } from '../../store/slices/selected-characters-slice.ts';
import { useAppDispatch } from '../../hooks/useRedux.ts';

interface CardItemProps {
  character: Character;
}

export const CardItem = ({ character }: CardItemProps) => {
  const { pathname } = useNavigation();
  const dispatch = useAppDispatch();

  const onChange = () => {
    dispatch(setCheckedCharacters(character));
  };

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
      <Checkbox onChange={onChange} />
    </li>
  );
};
