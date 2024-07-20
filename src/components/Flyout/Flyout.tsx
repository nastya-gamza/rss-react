import classNames from 'classnames';
import {
  selectCharacters,
  uncheckAllCharacters,
} from '../../store/slices/characters-slice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.ts';
import { PrimaryButton } from '../PrimaryButton';
import { DownloadCSV } from '../DownloadCSV/DownloadCSV.tsx';
import styles from './Flyout.module.css';

export const Flyout = () => {
  const checkedCharacters = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();
  console.log(checkedCharacters);

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  return (
    <div
      className={classNames(styles.flyout, {
        [styles.show]: checkedCharacters.results.length > 0,
      })}
    >
      <div className={styles.info}>
        {checkedCharacters.results.length === 1
          ? `${checkedCharacters.results.length} character is selected`
          : `${checkedCharacters.results.length} characters are selected`}
      </div>
      <div className={styles.btns}>
        <PrimaryButton onClick={handleUncheck}>Unselect all</PrimaryButton>
        <DownloadCSV
          data={checkedCharacters?.results}
          fileName={`${checkedCharacters?.results.length}_characters.csv`}
        />
      </div>
    </div>
  );
};
