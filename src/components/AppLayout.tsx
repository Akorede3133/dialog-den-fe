import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout;