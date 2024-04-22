import { ReactElement, cloneElement, createContext, useContext, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { callProp, selectChat, setOutGoingVideoCall, setOutGoingVoiceCall, setVideoCall, setVoiceCall, turnOffCalls } from "../redux/chatSlice";
import useCurrentUser from "../../auth/hooks/useCurrentUser";

type CallWindowProp = {
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>
} 
type CallWindowChildrenProp = {
  children: ReactElement;
  callType: string;
}
export const CallWindowContext = createContext<CallWindowProp>({} as CallWindowProp);

const CallWindowOpen = ({ children, callType }: CallWindowChildrenProp) => {
  const { setOpen } = useContext(CallWindowContext);
  const dispatch = useAppDispatch()
  useCurrentUser();
  const { receiver, socket } = useAppSelector(selectChat)

  const handleCall = () => {
    setOpen(callType);
    if (callType === 'voice-call') {
      dispatch(setVoiceCall());
      dispatch(setOutGoingVoiceCall(receiver as callProp))
      socket.emit('sendOutgoingCall', { callReceiverId: receiver?.id, type: 'voice'})
      
    }
    if (callType === 'video-call') {
      dispatch(setVideoCall());
      dispatch(setOutGoingVideoCall(receiver as callProp))
      socket.emit('sendOutgoingCall', { callReceiverId: receiver?.id, type: 'video'})
    }
  }
  return (
    cloneElement(children, { onClick: handleCall})
  )
}
const CallWindowModal = ({ children, callType}: CallWindowChildrenProp) => {
  const { open } = useContext(CallWindowContext);
  console.log(open, callType);
  

  if (callType === open) {
    return (
      <div className="absolute z-20 w-full top-0 left-0 bg-black min-h-screen">
        { children }
      </div>
    )
  }
  return null;

}
const CallClose = ({ children, callType, remoteAudioRef, localVideoRef }: { children: ReactElement, remoteAudioRef?: React.RefObject<HTMLAudioElement>, callType: string, localVideoRef?: React.RefObject<HTMLVideoElement> }) => {
  const { setOpen } = useContext(CallWindowContext);
  const dispatch = useAppDispatch()
  const { outGoingVoiceCall, incomingVoiceCall, socket, outGoingVideoCall, incomingVideoCall } = useAppSelector(selectChat)
  
  const handleCallClose = () => {
    setOpen('');
    dispatch(turnOffCalls());    
    if (callType === 'video') {
      if (localVideoRef?.current) {
        localVideoRef.current.srcObject = null;
      }
      socket.emit('cancelOutgoingVideoCall', { callReceiverId: outGoingVideoCall?.id || incomingVideoCall?.id })
    } else {
      if (remoteAudioRef?.current) {
        remoteAudioRef.current.srcObject = null;
      }
      socket.emit('cancelOutgoingVoiceCall', { callReceiverId: outGoingVoiceCall?.id || incomingVoiceCall?.id })
    }
   
  }

  return (
    cloneElement(children, { onClick: handleCallClose})
  )

}
const CallWindow = ({ children }: { children: ReactElement }) => {
  const [open, setOpen] = useState('');
  return (
    <CallWindowContext.Provider value={{
      open,
      setOpen
    }}>
      { children }
    </CallWindowContext.Provider>
  )
}


CallWindow.Open = CallWindowOpen;
CallWindow.Modal = CallWindowModal;
CallWindow.Close = CallClose;

export default CallWindow;