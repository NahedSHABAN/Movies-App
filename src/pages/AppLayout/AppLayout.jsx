import { Provider } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { store } from '../../store/store';

export default function AppLayout() {
  return (
    <Provider store={store}>
      <div className="bg-dark text-light min-vh-100">
      <NavBar />
      <Outlet />
    </div>
    </Provider>
  );
}
