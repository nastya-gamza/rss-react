import { FormWithBase64File } from '../../types';

type FormInfoCardProps = {
  cardInfo: FormWithBase64File;
};

export const FormInfoCard = ({ cardInfo }: FormInfoCardProps) => {
  const imageUrl = `${cardInfo.file}`;
  return (
    <li>
      <p>{cardInfo.name}</p>
      <p>{cardInfo.age}</p>
      <p>{cardInfo.email}</p>
      <p>{cardInfo.password}</p>
      <p>{cardInfo.gender}</p>
      <p>{cardInfo.acceptTerms}</p>
      <p>
        <img src={imageUrl} alt='image from form' width={150} />
      </p>
    </li>
  );
};
