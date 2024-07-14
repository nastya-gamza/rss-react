import { PrimaryButton } from '../PrimaryButton';
import styles from './Error.module.css';

interface ErrorProps {
  message: string;
  btnText?: string;
  handleRefresh?: () => void;
}

export const Error = ({ message, btnText, handleRefresh }: ErrorProps) => (
  <div className={styles.wrapper} data-testid='error-page'>
    <p className={styles.message}>Oops!</p>
    <h3 className={styles.message} data-testid='error-message'>
      {message}
    </h3>
    {Boolean(btnText) && <PrimaryButton onClick={handleRefresh}>{btnText}</PrimaryButton>}
  </div>
);
