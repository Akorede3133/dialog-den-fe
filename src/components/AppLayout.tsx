import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Conversation from '../features/chats/components/Conversation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectChat } from '../features/chats/redux/chatSlice';
import VoiceCall from '../features/chats/components/VoiceCall';
import VideoCall from '../features/chats/components/VideoCall';
import IncomingCallNotification from '../features/chats/components/IncomingCallNotification';
import ReceiverVoiceCall from '../features/chats/components/ReceiverVoiceCall';
import ReceiverVideoCall from '../features/chats/components/ReceiverVideoCall';
import { useEffect } from 'react';
import socketListener from '../features/chats/utils/socketListener';
import useCurrentUser from '../features/auth/hooks/useCurrentUser';
import EmptyChat from '../features/chats/components/EmptyChat';
import OtherUserProfilePage from '../features/profile/components/OtherUserProfilePage';

const AppLayout = () => {
  const {showConversation, socket, receiver, voiceCall, videoCall, incomingVoiceCall, incomingVideoCall, outGoingVoiceCall, outGoingVideoCall, onGoingCall, showOtherUserProfile } = useAppSelector(selectChat);  
  
  const {user} = useCurrentUser();
  const dispatch = useAppDispatch();
  
  
  useEffect(() => {
    if (user) {
      socket.emit('user', user)      
    }
    socketListener(socket, dispatch)

  }, [socket, dispatch, user])

  return (
    <div className='flex flex-col sm:flex-row h-screen  max-h-screen w-full overflow-hidden relative'>
        { incomingVoiceCall && !onGoingCall && <IncomingCallNotification incomingCall={incomingVoiceCall} />} 
        { incomingVideoCall && !onGoingCall && <IncomingCallNotification incomingCall={incomingVideoCall} />}
        { voiceCall &&  outGoingVoiceCall &&  <VoiceCall /> }
        { voiceCall && incomingVoiceCall &&  <ReceiverVoiceCall /> }
        { videoCall && outGoingVideoCall &&  <VideoCall /> }
        { videoCall && incomingVideoCall && <ReceiverVideoCall /> }
        <NavBar />
        <div className="h-full  overflow-hidden w-full sm:max-w-[400px] sm:[w-400px] bg-sidebar-light sm:order-1">
          <Outlet />
        </div>
        <div className={`${(!receiver || !showConversation) ? 'translate-x-[100%] sm:transition-none sm:translate-x-0 transition-all ease-in duration-[0.4s]' : 'block'} sm:block h-full ${showOtherUserProfile ? 'half--conversation': 'conversation'} absolute top-0 right-0 bg-green-500 sm:static order-3 overflow-hidden`}>
          {
            receiver ? <Conversation /> : <EmptyChat />
          }
        </div>
        {
          receiver  && showOtherUserProfile &&
          <div className={`translate-x-[100% sm:transition-none sm:translate-x-0 transition-all ease-in duration-[0.4s] sm:block h-full z-30 half--conversation absolute top-0 right-0 bg-white sm:static order-4`}>
          <OtherUserProfilePage />
        </div>
        }
    </div>
  )
}

export default AppLayout;