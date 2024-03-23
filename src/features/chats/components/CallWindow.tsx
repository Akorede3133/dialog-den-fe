import { ReactElement, ReactNode, cloneElement, createContext, useContext, useState } from "react"
import { useAppDispatch } from "../../../redux/hooks";
import { setVideoCall, setVoiceCall, turnOffCalls } from "../redux/chatSlice";

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
  const handleCall = () => {
    setOpen(callType);
    if (callType === 'voice-call') {
      dispatch(setVoiceCall());
    }
    if (callType === 'video-call') {
      dispatch(setVideoCall());
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
const CallClose = ({ children }: { children: ReactElement }) => {
  const { setOpen } = useContext(CallWindowContext);
  const dispatch = useAppDispatch()
  const handleCallClose = () => {
    setOpen('');
    dispatch(turnOffCalls());
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