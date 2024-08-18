import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import { UncontrolledFormPage } from '../pages/UncontrolledFormPage/UncontrolledFormPage.tsx';
import { ReactHookFormPage } from '../pages/ReactHookFormPage/ReactHookFormPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/uncontrolled',
    element: <UncontrolledFormPage />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookFormPage />,
  },
]);
