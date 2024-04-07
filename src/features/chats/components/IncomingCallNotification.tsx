import logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { callProp, selectChat, setOnGoingCall, setVideoCall, setVoiceCall } from '../redux/chatSlice';
import CallWindow from './CallWindow';

const IncomingCallNotification = ({ incomingCall }: {incomingCall: callProp}) => {
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector(selectChat)
  const handleAnswer = () => {
    socket?.emit('sendOnGoingCall', { callerId: incomingCall?.id})
    dispatch(setOnGoingCall(true));
    if (incomingCall.type === 'voice') {
      dispatch(setVoiceCall());
    } else if (incomingCall.type === 'video') {
      dispatch(setVideoCall());
    }
  }
  return (
    <div className="absolute z-50  right-[10%] top-[70%] w-[300px] bg-bg-silver text-white rounded-lg px-4 flex items-start py-3 gap-5 ">
      <div className=' flex items-center gap-4'>
        <img src={logo} alt="" className="w-[50px] object-cover h-[50px] rounded-full" />
      </div>
      <div className='flex text-text-primary flex-col gap-1 items-start '>
        <p className='text-sm'>{incomingCall?.username}</p>
        <p className='text-sm capitalize'>{`Incoming ${incomingCall?.type} call`}</p>
        <div className=' flex items-center gap-4'>
          <CallWindow.Close>
            <button className='bg-red-500 text-white px-4 py-2 rounded-full text-sm'>
            Reject
            </button>
          </CallWindow.Close>
        
          <button className='bg-green-500 rounded-full  px-4 py-1 text-sm text-white' onClick={handleAnswer}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncomingCallNotification