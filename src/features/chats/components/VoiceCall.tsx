import { FaPhone } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import CallWindow from './CallWindow';

const VoiceCall = () => {
  return (
    <div className=" bg-message-bg-blue min-h-screen flex flex-col justify-center items-center gap-20 w-full">
      <div className=' text-center'>
        <p className=' text-2xl text-white'>Tracy</p>
        <span className='text-white text-sm'>calling...</span>
      </div>
      <img src={logo} alt="" className='w-[150px] h-[150px] rounded-full' />
      <CallWindow>
        <CallWindow.Close>
          <button className='bg-red-500 p-4 rounded-full  animate-pulse'>
            <FaPhone className=' text-white' />
          </button>
        </CallWindow.Close>
      
      </CallWindow>
    
    </div>
  )
}

export default VoiceCall