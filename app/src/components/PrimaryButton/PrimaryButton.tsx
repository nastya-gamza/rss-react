import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => (
  <button className={styles.btn} {...props}>
    {children}
  </button>
);
