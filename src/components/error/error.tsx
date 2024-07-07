import { PrimaryButton } from '../primary-button';
import styles from './error.module.css';

interface ErrorProps {
  handleRefresh: () => void;
}

export const Error = ({ handleRefresh }: ErrorProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.message}>Oops! Please try again</h3>
      <PrimaryButton onClick={handleRefresh}>Back home</PrimaryButton>
    </div>
  );
};
