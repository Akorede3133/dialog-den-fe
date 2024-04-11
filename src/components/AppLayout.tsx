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
      <main className='sm:ml-[5rem] flex  bg-blu relative overflow-hidden'>
        <div className=' w-full sm:w-[35%] bg-sidebar-light min-h-screen px-2'>
          <Outlet />
        </div>
        <div className={` ${!showConversation && 'hidden'} sm:block min-h-screen absolute w-full sm:w-[70%] sm:static left-0 bg-blue-500`}>
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