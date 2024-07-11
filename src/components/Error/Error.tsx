import { PrimaryButton } from '../PrimaryButton';
import styles from './Error.module.css';

interface ErrorProps {
  message: string;
  btnText: string;
  handleRefresh: () => void;
}

export const Error = ({ message, btnText, handleRefresh }: ErrorProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.message}>{message}</h3>
      <PrimaryButton onClick={handleRefresh}>{btnText}</PrimaryButton>
    </div>
  );
};
