import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <main className='sm:ml-[5rem]'>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout;