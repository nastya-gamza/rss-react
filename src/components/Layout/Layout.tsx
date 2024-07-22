import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { Header } from '../Header';
import { Main } from '../Main';
import { useNavigation } from '../../hooks';
import styles from './Layout.module.css';

export const Layout = () => {
  const { pathname, handleNavigate } = useNavigation();

  return (
    <div className={styles.wrapper}>
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
