import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Conversation from '../features/chats/components/Conversation';

const AppLayout = () => {
  return (
    <div className='relative'>
      <NavBar />
      <main className='sm:ml-[5rem] flex  bg-blu relative'>
        <div className=' w-full sm:w-[35%] bg-sidebar-light min-h-screen px-2'>
          <Outlet />
        </div>
        <div className='hidde sm:block min-h-screen absolute w-full sm:w-[70%] sm:static left-0 bg-blue-500'>
          <Conversation />
        </div>
      </main>
    </div>
  )
}

export default AppLayout;