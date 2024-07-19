import { FormEventHandler, useEffect, useState } from 'react';
import styles from './Checkbox.module.css';
import { useAppSelector } from '../../hooks/useRedux.ts';
import { selectCharacters } from '../../store/slices/characters-slice.ts';

interface CheckboxProps {
  onChange: FormEventHandler<HTMLLabelElement> | undefined;
}

export const Checkbox = ({ onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkedCharacters = useAppSelector(selectCharacters);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (checkedCharacters.results.length === 0) {
      setIsChecked(false);
    }
  }, [checkedCharacters.results]);

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
    // <label onChange={onChange}>
    //   <input
    //     type='checkbox'
    //     onChange={() => {
    //       setIsChecked(!isChecked);
    //     }}
    //   />
    //   <span
    //     className={classNames(styles.checkbox, {
    //       [styles.checkboxActive]: isChecked,
    //     })}
    //     aria-hidden='true'
    //   />
    // </label>
  );
};
