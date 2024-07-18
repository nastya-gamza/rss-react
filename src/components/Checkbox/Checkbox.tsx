import { useState } from 'react';
import styles from './Checkbox.module.css';
import classNames from 'classnames';

export const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label>
      <input
        type='checkbox'
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <span
        className={classNames(styles.checkbox, {
          [styles.checkboxActive]: isChecked,
        })}
        aria-hidden='true'
      />
    </label>
  );
};
