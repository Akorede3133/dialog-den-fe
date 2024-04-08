import { FaPhone } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import CallWindow from './CallWindow';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addAnswer, addIce, selectChat, setLocalStream, setRemotePeerConnection, setRemoteStream } from '../redux/chatSlice';
import { useEffect, useRef, useState } from 'react';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import formatDuration from '../../../utils/formatDuration';
import { MdCallEnd } from 'react-icons/md';
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs';

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
const ReceiverVoiceCall = () => {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [mutedAudio, setMuteAudio] = useState(false);

  const { user } = useCurrentUser();
  const [callDuration, setCallDuration] = useState(0);

  const dispatch = useAppDispatch();
  const { offerObj, iceCandidates, onGoingCall, peerIces, incomingVoiceCall, socket, remoteStream, localStream }   = useAppSelector(selectChat);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  const handleMuteAudio = () => {
    setMuteAudio((prev) => !prev)
    if (mutedAudio) {
      localStream?.getAudioTracks().forEach((track) => {      
        track.enabled = true;
      })
    } else {
      localStream?.getAudioTracks().forEach((track) => {      
        track.enabled = false;
      })
    }    
  };

  useEffect(() => {
    const getMedia = async () => {        
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      dispatch(setLocalStream(stream))

      const peerConnection = new RTCPeerConnection(peerConfiguration)
      const rmStream = new MediaStream();
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = rmStream;
      }
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      })
      peerConnection?.setRemoteDescription(offerObj?.offer as RTCSessionDescriptionInit);
      peerConnection.addEventListener('icecandidate', (e) => {
        if (e.candidate) {
          dispatch(addIce(e.candidate))
        }
      })
      peerConnection.addEventListener('track', (e) => {
          console.log('===Adding Track===');
        e.streams[0].getTracks().forEach((track) => {
          rmStream.addTrack(track)
        })
      })
      peerConnection.addEventListener('signalingstatechange', () => {
        console.log(peerConnection.signalingState);
      })
      peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(peerConnection.iceGatheringState);
      })
      peerConnection.addEventListener('iceconnectionstatechange', () => {
        console.log(peerConnection.iceConnectionState);
      })
      peerConnection.addEventListener('connectionstatechange', () => {
        console.log(peerConnection.connectionState);
      })
      dispatch(setRemotePeerConnection(peerConnection))
      dispatch(setRemoteStream(rmStream))
    }
    getMedia();
  }, [dispatch, offerObj?.offer])

  useEffect(() => {
    if (onGoingCall) {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    }
  }, [onGoingCall])

  useEffect(() => {
    const createAnswer = async () => {     
      const answer = await remoteStream.peerConnection?.createAnswer();
      socket.emit('sendAnswer', {answer, offererId: offerObj?.offererId})
      dispatch(addAnswer(answer))
      if (!hasAnswer) {
        remoteStream.peerConnection?.setLocalDescription(answer);
      }
    }
    if (offerObj?.offererId && remoteStream.peerConnection) {
      createAnswer();
      setHasAnswer(true);
    }
  }, [dispatch, offerObj?.offererId, remoteStream.peerConnection, socket, hasAnswer])
  

  useEffect(() => {
    if (iceCandidates.length && user?.id) {
      socket.emit('sendIceCandidate',{ candidate: iceCandidates[iceCandidates.length - 1], iceCandidateOffererId: user?.id })
    }
  }, [iceCandidates, user?.id, socket])

  useEffect(() => {
    if (remoteStream.peerConnection) {
      peerIces.forEach(async (ice) => {
        await remoteStream.peerConnection?.addIceCandidate(ice);
      })
    }    
  }, [peerIces, remoteStream.peerConnection])


  return (
    <div className="bg-message-bg-blue min-h-screen flex flex-col justify-between items-center gap-20 w-full py-5">
      <audio ref={localAudioRef} hidden autoPlay playsInline></audio>
      <audio ref={remoteAudioRef} hidden autoPlay playsInline></audio>

      <div className=' text-center'>
        <p className=' text-2xl text-white'>{incomingVoiceCall?.username}</p>
        <span className='text-white text-sm'>{onGoingCall ? formatDuration(callDuration) : 'calling...'}</span>
      </div>
      <img src={logo} alt="" className='w-[150px] h-[150px] rounded-full' />
      { !onGoingCall && 
      <CallWindow>
        <CallWindow.Close callType='voice' remoteAudioRef={remoteAudioRef}>
          <button className='bg-red-500 p-4 rounded-full  animate-pulse'>
            <FaPhone className=' text-white' />
          </button>
        </CallWindow.Close>
      </CallWindow> 
      }
        {
        onGoingCall && <div className=' w-full self-end flex justify-center items-center gap-4'>
            <CallWindow>
            <CallWindow.Close callType='voice' remoteAudioRef={remoteAudioRef}>
              <button className='bg-red-500 h-[50px] w-[50px] flex justify-center items-center rounded-full'>
                <MdCallEnd className=' text-white' />
              </button>
            </CallWindow.Close>
          </CallWindow>
           { !mutedAudio ? 
           <button className='p-4 rounded-full bg-gray-600' onClick={handleMuteAudio}>
            <BsMicFill className=' text-white text-xl' />
            </button> :
            <button className='p-4 rounded-full bg-gray-600' onClick={handleMuteAudio}>
            <BsMicMuteFill className=' text-white text-xl' />
             </button> }
        </div>
      }
     
    </div>
  )
}

export default ReceiverVoiceCall;