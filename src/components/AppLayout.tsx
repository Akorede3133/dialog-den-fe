import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Conversation from '../features/chats/components/Conversation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectChat } from '../features/chats/redux/chatSlice';
import CallWindow from '../features/chats/components/CallWindow';
import VoiceCall from '../features/chats/components/VoiceCall';
import VideoCall from '../features/chats/components/VideoCall';
import IncomingCallNotification from '../features/chats/components/IncomingCallNotification';
import ReceiverVoiceCall from '../features/chats/components/ReceiverVoiceCall';
import ReceiverVideoCall from '../features/chats/components/ReceiverVideoCall';
import { useEffect, useState } from 'react';
import socketListener from '../features/chats/utils/socketListener';
import useCurrentUser from '../features/auth/hooks/useCurrentUser';

const AppLayout = () => {
  const {showConversation, socket, receiver, voiceCall, videoCall, incomingVoiceCall, incomingVideoCall, outGoingVoiceCall, outGoingVideoCall, onGoingCall } = useAppSelector(selectChat);
  const {user} = useCurrentUser();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (user) {
      socket.emit('user', user)      
    }
    socketListener(socket, dispatch)

  }, [socket, dispatch, user])
  return (
    <div className='relative'>
        { incomingVoiceCall && !onGoingCall && <IncomingCallNotification incomingCall={incomingVoiceCall} />}
        { incomingVideoCall && !onGoingCall && <IncomingCallNotification incomingCall={incomingVideoCall} />}
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
      <main className='sm:ml-[5rem] flex relative overflow-hidden max-h-screen bg-sidebar-light'>
        <div className=' w-full sm:w-[35%] bg-sidebar-light min-h-screen px-2'>
          <Outlet />
        </div>
        <div className={` ${!showConversation && ' translate-x-[100%] sm:transition-none sm:translate-x-0 transition-all ease-in duration-[0.4s]'} sm:block sm:h-screen min-h-screen h-full absolute w-full sm:w-[70%] sm:static overflow-hidden left-0 bg-blue-500`}>

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