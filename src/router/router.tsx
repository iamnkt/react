import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Details from '../components/details/details';
import ErrorPage from '../components/error-page/errorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'details/:detailId',
        element: <Details />,
      },
    ],
  },
]);
