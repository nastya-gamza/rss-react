import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.wrapper} data-testid='loader'>
    <div className={styles.loader}></div>
  </div>
);
