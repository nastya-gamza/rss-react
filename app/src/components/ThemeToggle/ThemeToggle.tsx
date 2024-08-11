import classNames from 'classnames';
import { useThemeContext } from '~/src/context/theme/useThemeContext';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button onClick={toggleTheme} className={styles.btn}>
      {theme === 'light' ? (
        <div className={classNames(styles.toggle, styles.light)}></div>
      ) : (
        <div className={classNames(styles.toggle, styles.dark)}></div>
      )}
    </button>
  );
};
