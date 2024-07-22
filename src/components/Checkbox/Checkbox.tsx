import styles from './Checkbox.module.css';

type CheckboxProps = {
  id: number;
  isChecked: boolean;
  handleCheckboxChange: () => void;
};

export const Checkbox = ({
  id,
  isChecked,
  handleCheckboxChange,
}: CheckboxProps) => (
  <label onClick={(e) => e.stopPropagation()}>
    <input
      type='checkbox'
      id={`checkbox-${id}`}
      checked={isChecked}
      onChange={handleCheckboxChange}
      className={styles.checkbox}
    />
  </label>
);
