import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { submittedDataSelector } from '../../store/slices/submittedData.ts';
import { FormInfoCard } from '../../components/FormInfoCard/FormInfoCard.tsx';

export const MainPage = () => {
  const formData = useAppSelector(submittedDataSelector);
  console.log(formData);

  return (
    <>
      <Link to='/uncontrolled'>Uncontrolled</Link>
      <Link to='/react-hook-form'>React-hook-form</Link>
      <ul>
        {formData.map((i) => (
          <FormInfoCard key={i.name} cardInfo={i} />
        ))}
      </ul>
    </>
  );
};
