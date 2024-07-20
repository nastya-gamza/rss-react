import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.ts';
import { Character } from '../../types';
import { setCheckedCharacters } from '../../store/slices/selected-characters-slice.ts';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  character: Character;
}

export const Checkbox = ({ character }: CheckboxProps) => {
  const dispatch = useAppDispatch();
  const checkedCharacters = useAppSelector((state) => state.selectedCharacters);

  const isChecked = checkedCharacters.some(({ id }) => id === character.id);

  const handleCheckboxChange = () => {
    dispatch(setCheckedCharacters(character));
  };

  return (
    <label>
      <input
        type='checkbox'
        id={`checkbox-${character.id}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={styles.checkbox}
      />
    </label>
  );
};
