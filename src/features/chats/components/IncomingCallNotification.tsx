import logo from '../../../assets/logo.png';
import { callProp } from '../redux/chatSlice';

const IncomingCallNotification = ({ incomingVoiceCall }: {incomingVoiceCall: callProp}) => {
  const { username } = incomingVoiceCall
  return (
    <div className="absolute z-50  right-[10%] top-[70%] w-[300px] bg-bg-silver text-white rounded-lg px-4 flex items-start py-3 gap-5 ">
      <div className=' flex items-center gap-4'>
        <img src={logo} alt="" className="w-[50px] object-cover h-[50px] rounded-full" />
      </div>
      <div className='flex text-text-primary flex-col gap-1 items-start '>
        <p className='text-sm'>{username}</p>
        <p className='text-sm capitalize'>Incoming voice call</p>
        <div className=' flex items-center gap-4'>
          <button className='bg-red-500 text-white px-4 py-2 rounded-full text-sm'>
            Reject
          </button>
          <button className='bg-green-500 rounded-full  px-4 py-1 text-sm text-white'>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncomingCallNotification