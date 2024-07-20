import { FormEventHandler, useEffect, useState } from 'react';
import styles from './Checkbox.module.css';
import { useAppSelector } from '../../hooks/useRedux.ts';

interface CheckboxProps {
  onChange: FormEventHandler<HTMLLabelElement> | undefined;
}

export const Checkbox = ({ onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkedCharacters = useAppSelector((state) => state.selectedCharacters);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (checkedCharacters.length === 0) {
      setIsChecked(false);
    }
  }, [checkedCharacters]);

  return (
    <label onChange={onChange}>
      <input
        className={styles.checkbox}
        type='checkbox'
        id='subscribeNews'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </label>
  );
};
