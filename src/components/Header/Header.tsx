import { ReactNode } from 'react';
import style from './Header.module.css';

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <header className={style.header}>
    <div className={style.container}>{children}</div>
  </header>
);
