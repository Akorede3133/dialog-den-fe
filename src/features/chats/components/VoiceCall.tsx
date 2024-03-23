import { FaPhone } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import CallWindow from './CallWindow';
import useFetchVoiceMedia from '../hooks/useFetchVoiceMedia';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectChat, setLocalStream } from '../redux/chatSlice';
import { useEffect, useRef } from 'react';
import useCreateOffer from '../hooks/useCreateOffer';
import useCreatePeerConnection from '../hooks/useCreatePeerConnection';

const VoiceCall = () => {
  const { stream } = useFetchVoiceMedia();
  const {offer} = useCreateOffer();
  const { peerConnection } = useCreatePeerConnection();
  const dispatch = useAppDispatch();
  const { localStream } = useAppSelector(selectChat)
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(()=> {
    if (stream.active) {
      dispatch(setLocalStream(stream))
    }
    
      // stream.getTracks().forEach((track) => {
      //   peerConnection?.addTrack(track, stream)
      // })
      if (audioRef.current) {
        // audioRef.current.srcObject = stream;
      }
  }, [stream, dispatch, localStream])

  return (
    <div className=" bg-message-bg-blue min-h-screen flex flex-col justify-center items-center gap-20 w-full">
      <audio ref={audioRef} hidden autoPlay playsInline></audio>
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