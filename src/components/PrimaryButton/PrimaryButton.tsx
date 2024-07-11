import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
};
