import { PrimaryButton } from '../primary-button';
import styles from './error.module.css';

interface ErrorProps {
  message: string;
  handleRefresh: () => void;
}

export const Error = ({ message, handleRefresh }: ErrorProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.message}>{message}</h3>
      <PrimaryButton onClick={handleRefresh}>Try again</PrimaryButton>
    </div>
  );
};
