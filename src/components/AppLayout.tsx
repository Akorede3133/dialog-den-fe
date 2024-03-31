import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Conversation from '../features/chats/components/Conversation';
import { useAppSelector } from '../redux/hooks';
import { selectChat } from '../features/chats/redux/chatSlice';
import CallWindow from '../features/chats/components/CallWindow';
import VoiceCall from '../features/chats/components/VoiceCall';
import VideoCall from '../features/chats/components/VideoCall';
import IncomingCallNotification from '../features/chats/components/IncomingCallNotification';
import ReceiverVoiceCall from '../features/chats/components/ReceiverVoiceCall';
import ReceiverVideoCall from '../features/chats/components/ReceiverVideoCall';

const AppLayout = () => {
  const { receiver, voiceCall, videoCall, incomingVoiceCall, incomingVideoCall, outGoingVoiceCall, outGoingVideoCall, onGoingCall } = useAppSelector(selectChat);
  
  return (
    <div className='relative'>
        {incomingVoiceCall && !onGoingCall && <CallWindow>
          <IncomingCallNotification incomingCall={incomingVoiceCall}/>
        </CallWindow>}
      {voiceCall && outGoingVoiceCall && <CallWindow>
          <VoiceCall />
        </CallWindow>}
        {voiceCall && incomingVoiceCall && <CallWindow>
          <ReceiverVoiceCall />
        </CallWindow>}
        {videoCall && outGoingVideoCall && <CallWindow>
          <VideoCall />
        </CallWindow>}
        {videoCall && incomingVideoCall && <CallWindow>
          <ReceiverVideoCall />
        </CallWindow>}
      {!voiceCall && !videoCall && <>
      <NavBar />
      <main className='sm:ml-[5rem] flex  bg-blu relative'>
        <div className=' w-full sm:w-[35%] bg-sidebar-light min-h-screen px-2'>
          <Outlet />
        </div>
        <div className='sm:block min-h-screen absolute w-full sm:w-[70%] sm:static left-0 bg-blue-500'>
        { incomingVoiceCall &&<IncomingCallNotification incomingCall={incomingVoiceCall} />}
        { incomingVideoCall &&<IncomingCallNotification incomingCall={incomingVideoCall} />}

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