import { FaPhone } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import CallWindow from './CallWindow';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addIce, addOffer, selectChat, setRemotePeerConnection, setRemoteStream } from '../redux/chatSlice';
import { useEffect, useRef } from 'react';
import { useSocketContext } from '../context/socketContext';
import useCurrentUser from '../../auth/hooks/useCurrentUser';

const VoiceCall = ({ callInfo }) => {
  const { socket } = useSocketContext();
  const { user } = useCurrentUser();

    const dispatch = useAppDispatch();
    const { receiver, offer, iceCandidates }   = useAppSelector(selectChat);
    const localAudioRef = useRef<HTMLAudioElement>(null);
    const remoteAudioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
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
        const offer = await peerConnection?.createOffer();
        dispatch(addOffer(offer))
        await peerConnection?.setLocalDescription(offer)
        peerConnection.addEventListener('icecandidate', (e) => {
          if (e.candidate) {
            console.log(e.candidate);
            
            dispatch(addIce(e.candidate))          
          }
        })
        peerConnection.addEventListener('track', (e) => {
          
        })
        dispatch(setRemotePeerConnection(peerConnection))
        dispatch(setRemoteStream(rmStream))
      }
      getMedia();
    }, [dispatch])

    useEffect(() => {
      socket?.emit('sendOffer', {offer, receiverId: receiver?.id})
    }, [offer, receiver?.id, socket])

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

export default VoiceCall