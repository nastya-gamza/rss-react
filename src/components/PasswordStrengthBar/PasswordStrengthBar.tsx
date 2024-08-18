import classNames from 'classnames';
import { calculatePasswordStrength } from '../../utils/calculatePasswordStrength.ts';
import styles from './PasswordStrengthBar.module.css';

type PasswordStrengthBar = {
  password: string;
};

export const PasswordStrengthBar = ({ password }: PasswordStrengthBar) => {
  const strength = calculatePasswordStrength(password);

  return (
    <div className={styles.strengthMeter}>
      <div
        className={classNames(
          styles.strengthBar,
          styles[`strength-${strength}`],
        )}
        style={{ width: `${(strength / 4) * 100}%` }}
      />
    </div>
  );
};
