import { createBrowserRouter } from 'react-router-dom';
import Login from '../features/auth/Login';
import { ProtectedComponent } from '../features/auth/ProtectedComponent';
import Root from '../pages/Root';
import { PrivateOutlet } from '../utils/PrivateOutlet';

function Hooray() {
  return (
    <div>
      <div>Hooray you logged in!</div>
      <div>
        <ProtectedComponent />
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [],
  },
  {
    path: '/login',
    element: <Login />,
    children: [],
  },
  {
    path: '*',
    element: <PrivateOutlet />,
    children: [
      {
        index: true,
        element: <Hooray />,
      },
    ],
  },
]);
