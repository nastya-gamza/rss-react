import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/uncontrolled'>Uncontrolled Form</Link>
      <Link to='/react-hook-form'>React-hook-form</Link>
    </header>
  );
};
