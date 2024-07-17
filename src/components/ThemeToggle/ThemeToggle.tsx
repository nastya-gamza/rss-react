import { useThemeContext } from '../../context/theme/useThemeContext.ts';
import classNames from 'classnames';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button onClick={toggleTheme} className={styles.toggle}>
      {theme === 'light' ? (
        <div className={classNames(styles.toggle, styles.light)}></div>
      ) : (
        <div className={classNames(styles.toggle, styles.dark)}></div>
      )}
    </button>
  );
};
