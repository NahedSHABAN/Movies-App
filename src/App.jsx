import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout/AppLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Movies from './pages/Movies/Movies';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';
import Details from './pages/Movies/Details';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { index: true, element: <Movies /> },
      { path: "movies/:id", element: <Details /> },
      { path: "favorites", element: <Favorites /> ,  }
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
