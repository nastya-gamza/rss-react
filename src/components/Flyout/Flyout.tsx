import classNames from 'classnames';
import { PrimaryButton } from '../PrimaryButton';
import { DownloadCSV } from '../DownloadCSV';
import { Character } from '../../types';
import styles from './Flyout.module.css';

type FlyoutProps = {
  items: Character[];
  onClick: () => void;
};

export const Flyout = ({ items, onClick }: FlyoutProps) => (
  <div
    className={classNames(styles.flyout, {
      [styles.visible]: items.length > 0,
    })}
  >
    <div className={styles.info}>
      {items.length === 1
        ? `${items.length} character is selected`
        : `${items.length} characters are selected`}
    </div>
    <div className={styles.btns}>
      <PrimaryButton onClick={onClick}>Unselect all</PrimaryButton>
      <DownloadCSV data={items} fileName={`${items.length}_characters.csv`} />
    </div>
  </div>
);
