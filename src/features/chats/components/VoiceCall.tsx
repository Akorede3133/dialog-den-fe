import { FaPhone } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';

const VoiceCall = () => {
  return (
    <div className=" bg-message-bg-blue min-h-screen flex flex-col justify-center items-center gap-20">
      <div className=' text-center'>
        <p className=' text-2xl text-white'>Tracy</p>
        <span className='text-white text-sm'>calling...</span>
      </div>
      <img src={logo} alt="" className='w-[150px] h-[150px] rounded-full' />
      <button className='bg-red-500 p-4 rounded-full  animate-pulse'>
        <FaPhone className=' text-white' />
      </button>
    </div>
  )
}

export default VoiceCall