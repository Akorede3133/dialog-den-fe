import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Conversation from '../features/chats/components/Conversation';
import { useAppSelector } from '../redux/hooks';
import { selectChat } from '../features/chats/redux/chatSlice';
import CallWindow from '../features/chats/components/CallWindow';
import VoiceCall from '../features/chats/components/VoiceCall';
import VideoCall from '../features/chats/components/VideoCall';
import IncomingCallNotification from '../features/chats/components/IncomingCallNotification';

const AppLayout = () => {
  const { receiver, voiceCall, videoCall, incomingVoiceCall } = useAppSelector(selectChat);
  return (
    <div className='relative'>
        {/* {incomingVoiceCall && <CallWindow>
          <VoiceCall />
        </CallWindow>} */}
      {voiceCall && <CallWindow>
          <VoiceCall />
        </CallWindow>}
        {videoCall && <CallWindow>
          <VideoCall />
        </CallWindow>}
      {!voiceCall && !videoCall && <>
      <NavBar />
      <main className='sm:ml-[5rem] flex  bg-blu relative'>
        <div className=' w-full sm:w-[35%] bg-sidebar-light min-h-screen px-2'>
          <Outlet />
        </div>
        <div className='sm:block min-h-screen absolute w-full sm:w-[70%] sm:static left-0 bg-blue-500'>
        { incomingVoiceCall &&<IncomingCallNotification incomingVoiceCall={incomingVoiceCall} />}

          {
            receiver ? <Conversation /> : 'Select a chat'
          }
        </div>
      </main>
      </>
      }
    </div>
  )
}

export default AppLayout;