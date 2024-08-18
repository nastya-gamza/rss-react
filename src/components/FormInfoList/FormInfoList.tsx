import { FormInfoCard } from '../FormInfoCard';
import { useAppSelector } from '../../store/hooks';
import { submittedDataSelector } from '../../store/slices/submittedData.ts';
import styles from './FormInfoList.module.css';
import { sortByDate } from '../../utils/sortByDate.ts';

export const FormInfoList = () => {
  const formData = useAppSelector(submittedDataSelector);

  const sortedFormData = sortByDate(formData);

  return sortedFormData.length > 0 ? (
    <ul className={styles.list}>
      {sortedFormData.map((item, index) => (
        <li key={index} className={index === 0 ? styles.highlightedItem : ''}>
          <FormInfoCard cardInfo={item} />
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.info}>Form data wasn't submitted</div>
  );
};
