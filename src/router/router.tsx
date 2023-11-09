import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Details from '../components/details/details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'details/:detailId',
        element: <Details />,
      },
    ],
  },
]);
