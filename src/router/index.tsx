import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import { ErrorPage } from '../pages/ErrorPage';
import { CharacterPage } from '../pages/CharacterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/character/:id',
        element: <CharacterPage />,
      },
    ],
  },
]);
