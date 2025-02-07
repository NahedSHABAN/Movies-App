import NavBar from '../../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <NavBar />
      <Outlet />
    </div>
  );
}
