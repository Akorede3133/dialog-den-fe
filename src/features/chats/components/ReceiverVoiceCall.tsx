import { FaPhone } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import CallWindow from './CallWindow';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addAnswer, addIce, selectChat, setRemotePeerConnection, setRemoteStream } from '../redux/chatSlice';
import { useEffect, useRef } from 'react';
import { useSocketContext } from '../context/socketContext';
import useCurrentUser from '../../auth/hooks/useCurrentUser';

const peerConfiguration = {
  iceServers:[
      {
          urls:[
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302'
          ]
      }
  ]
}
const ReceiverVoiceCall = ({ callInfo }) => {
  const { socket } = useSocketContext();
  const { user } = useCurrentUser();
  
    const dispatch = useAppDispatch();
    const { offerObj, answer, iceCandidates }   = useAppSelector(selectChat);
    const localAudioRef = useRef<HTMLAudioElement>(null);
    const remoteAudioRef = useRef<HTMLAudioElement>(null);
    useEffect(() => {
      const getMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const peerConnection = new RTCPeerConnection(peerConfiguration)
        const rmStream = new MediaStream();
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = rmStream;
        }
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        })
        await peerConnection?.setRemoteDescription(offerObj.offer);
        const answer = await peerConnection.createAnswer();
        dispatch(addAnswer(answer))
        await peerConnection?.setLocalDescription(answer)
        peerConnection.addEventListener('icecandidate', (e) => {
          if (e.candidate) {
            dispatch(addIce(e.candidate))
          }
        })
        peerConnection.addEventListener('track', (e) => {
          
        })
        dispatch(setRemotePeerConnection(peerConnection))
        dispatch(setRemoteStream(rmStream))
      }
      getMedia();
    }, [dispatch, offerObj.offer])
   
    useEffect(() => {
      socket?.emit('sendAnswer', {answer, offererId: offerObj?.offererId})
    }, [answer, offerObj?.offererId, socket])

    useEffect(() => {
      if (iceCandidates.length) {
        socket?.emit('sendIceCandidate',{ candidate: iceCandidates[iceCandidates.length - 1], iceCandidateOffererId: user?.id })
      }
    }, [iceCandidates, user?.id])

  return (
    <div className=" bg-message-bg-blue min-h-screen flex flex-col justify-center items-center gap-20 w-full">
      <audio ref={localAudioRef} hidden autoPlay playsInline></audio>
      <audio ref={remoteAudioRef} hidden autoPlay playsInline></audio>

      <div className=' text-center'>
        <p className=' text-2xl text-white'>{callInfo.username}</p>
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

export default ReceiverVoiceCall;