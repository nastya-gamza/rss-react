import { Link } from '@remix-run/react';
import styles from './Error.module.css';

type ErrorProps = {
  message: string;
  btnText?: string;
};

export const Error = ({ message, btnText }: ErrorProps) => (
  <div className={styles.wrapper} data-testid='error-page'>
    <p className={styles.message}>Oops!</p>
    <h3 className={styles.message} data-testid='error-message'>
      {message}
    </h3>
    {Boolean(btnText) && (
      <Link to='/' className={styles.btn}>
        {btnText}
      </Link>
    )}
  </div>
);
