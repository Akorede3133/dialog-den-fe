import { ReactNode, useState } from 'react';
import { createContext, useContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addAnswer, callProp, selectChat, setIncomingVoiceCall, setOfferObj, setOnGoingVoiceCall, turnOffCalls} from '../redux/chatSlice';
interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: number[];
}

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket| null>(null);
  const { remoteStream } = useAppSelector(selectChat)
  const [onlineUsers, setOnlineUsers] = useState<number[]>([])
  const { user }  = useCurrentUser();
  const dispatch = useAppDispatch();
  
  useEffect(()=> {
    const socket = io('http://localhost:3000', {
      query: {
        userId: user?.id
      }
    });
    socket.on('getOnlineUsers', (users: number[]) => {
      setOnlineUsers(users);
    })
    socket.on('sendOutgoingVoiceCallToReceiver', (user: callProp) => {
      dispatch(setIncomingVoiceCall(user))

    });
    socket.on('cancelOutgoingVoiceCallForReceiver', () => {
      dispatch(turnOffCalls())      
    });
    socket.on('sendOnGoingVoiceCall', () => {
      dispatch(setOnGoingVoiceCall(true));
    })
    socket.on('sendOffer', (offerObj) => {   
      dispatch(setOfferObj(offerObj))
    });
    socket.on('sendAnswer', async (answer) => {   
      if (answer && !remoteStream.peerConnection?.currentRemoteDescription) {
        await remoteStream.peerConnection?.setRemoteDescription(answer)
      }
      dispatch(addAnswer(answer))
    });
    socket.on('updatedOfferWithIceCandiadates', async (ice) => {
      await remoteStream.peerConnection?.addIceCandidate(ice)
    });
    setSocket(socket);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user, dispatch, remoteStream.peerConnection])
  return <SocketContext.Provider value={{
    socket,
    onlineUsers
  }}>
    { children }
  </SocketContext.Provider>
}

export const useSocketContext = () => (
  useContext(SocketContext)
);