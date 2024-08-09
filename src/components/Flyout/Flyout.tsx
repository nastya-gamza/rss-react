import classNames from 'classnames';
import { PrimaryButton } from '../PrimaryButton';
import { DownloadCSV } from '../DownloadCSV';
import styles from './Flyout.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../../store/slices/checkedCharactersSlice.ts';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const checkedCharacters = useAppSelector(checkedCharactersSelector);

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  return (
    <div
      className={classNames(styles.flyout, {
        [styles.visible]: checkedCharacters.length > 0,
      })}
    >
      <div className={styles.info}>
        {checkedCharacters.length === 1
          ? `${checkedCharacters.length} character is selected`
          : `${checkedCharacters.length} characters are selected`}
      </div>
      <div className={styles.btns}>
        <PrimaryButton onClick={handleUncheck}>Unselect all</PrimaryButton>
        <DownloadCSV
          data={checkedCharacters}
          fileName={`${checkedCharacters.length}_characters.csv`}
        />
      </div>
    </div>
  );
};
