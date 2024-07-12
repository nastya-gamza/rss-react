import LoaderIcon from '/public/icons/loader.svg?react';
import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.wrapper}>
    <LoaderIcon className={styles.loader} />
  </div>
);
