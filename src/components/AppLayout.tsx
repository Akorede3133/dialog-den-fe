import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const AppLayout = () => {
  return (
    <div className='relative'>
      <NavBar />
      <main className='sm:ml-[5rem] flex  bg-blu'>
        <div className=' w-full sm:w-[400px] bg-sidebar-light min-h-screen'>
          <Outlet />
        </div>
        <div className='hidden sm:block bg-red-500 min-h-screen'>
        </div>
      </main>
    </div>
  )
}

export default AppLayout;