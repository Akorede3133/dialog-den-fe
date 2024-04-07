import { ReactElement, ReactNode, cloneElement, createContext, useContext, useState } from "react"
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
  const { user } = useCurrentUser();
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

  if (callType === open) {
    return (
      <div className="absolute w-full top-0 left-0 bg-black min-h-screen">
        { children }
      </div>
    )
  }
  return null;

}
const CallClose = ({ children, remoteAudioRef }: { children: ReactElement, remoteAudioRef?: React.RefObject<HTMLAudioElement> }) => {
  const { setOpen } = useContext(CallWindowContext);
  const dispatch = useAppDispatch()
  const { outGoingVoiceCall, incomingVoiceCall, socket } = useAppSelector(selectChat)


  const handleCallClose = () => {
    setOpen('');
    dispatch(turnOffCalls());
    if (remoteAudioRef?.current) {
      remoteAudioRef.current.srcObject = null;
    }
    socket?.emit('cancelOutgoingVoiceCall', { callReceiverId: outGoingVoiceCall?.id || incomingVoiceCall?.id })
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