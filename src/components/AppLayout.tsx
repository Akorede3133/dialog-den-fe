import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Conversation from '../features/chats/components/Conversation';
import { useAppSelector } from '../redux/hooks';
import { selectChat } from '../features/chats/redux/chatSlice';

const AppLayout = () => {
  const { receiver } = useAppSelector(selectChat);
  return (
    <div className='relative'>
      <NavBar />
      <main className='sm:ml-[5rem] flex  bg-blu relative'>
        <div className=' w-full sm:w-[35%] bg-sidebar-light min-h-screen px-2'>
          <Outlet />
        </div>
        <div className='sm:block min-h-screen absolute w-full sm:w-[70%] sm:static left-0 bg-blue-500'>
          {
            receiver ? <Conversation /> : 'Select a chat'
          }
        </div>
      </main>
    </div>
  )
}

export default AppLayout;