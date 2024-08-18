import classNames from 'classnames';
import { Form } from '../../types';
import styles from './FormInfoCard.module.css';

type FormInfoCardProps = {
  cardInfo: Form;
};

export const FormInfoCard = ({ cardInfo }: FormInfoCardProps) => (
  <div className={classNames(styles.card)}>
    <div className={styles.imgWrapper}>
      <img
        className={styles.img}
        src={`${cardInfo.file}`}
        alt='image from form'
        width={150}
      />
    </div>
    <div className={styles.info}>
      <p>Name: {cardInfo.name}</p>
      <p> Age: {cardInfo.age}</p>
      <p>Email: {cardInfo.email}</p>
      <p>Password: {cardInfo.password}</p>
      <p>Gender: {cardInfo.gender}</p>
      <p>Accept Terms: {cardInfo.acceptTerms ? '✓' : '-'}</p>
    </div>
  </div>
);
