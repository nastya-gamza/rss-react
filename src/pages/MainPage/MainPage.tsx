import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <>
      <Link to='/uncontrolled'>Uncontrolled</Link>
      <Link to='/react-hook-form'>React-hook-form</Link>
    </>
  );
};
