import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { Header } from '../Header';
import { Main } from '../Main';
import { useNavigation } from '../../hooks';
import { ThemeContext } from '../../context/theme/themeContext.ts';
import { useContext } from 'react';
import styles from './Layout.module.css';

export const Layout = () => {
  const { theme } = useContext(ThemeContext);
  const { pathname, handleNavigate } = useNavigation();

  return (
    <div className={styles.wrapper} data-theme={theme} data-testid={theme}>
      <div className={styles.wrapper} onClick={handleNavigate}>
        <div
          className={classNames(styles.main, {
            [styles.blur]: pathname.includes('character'),
          })}
        >
          <Header />
          <Main />
        </div>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
