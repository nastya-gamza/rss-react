import classNames from 'classnames';
import { uncheckAllCharacters } from '../../store/slices/selected-characters-slice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.ts';
import { PrimaryButton } from '../PrimaryButton';
import { DownloadCSV } from '../DownloadCSV/DownloadCSV.tsx';
import styles from './Flyout.module.css';

export const Flyout = () => {
  const checkedCharacters = useAppSelector((state) => state.selectedCharacters);
  const dispatch = useAppDispatch();
  const checkedCharactersLength = checkedCharacters?.length;

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  return (
    <div
      className={classNames(styles.flyout, {
        [styles.show]: checkedCharactersLength > 0,
      })}
    >
      <div className={styles.info}>
        {checkedCharactersLength === 1
          ? `${checkedCharactersLength} character is selected`
          : `${checkedCharactersLength} characters are selected`}
      </div>
      <div className={styles.btns}>
        <PrimaryButton onClick={handleUncheck}>Unselect all</PrimaryButton>
        <DownloadCSV
          data={checkedCharacters}
          fileName={`${checkedCharactersLength}_characters.csv`}
        />
      </div>
    </div>
  );
};
