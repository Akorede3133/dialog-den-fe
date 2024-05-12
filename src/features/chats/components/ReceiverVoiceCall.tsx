import { FaPhone } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addAnswer, addIce, selectChat, setLocalStream, setRemotePeerConnection, setRemoteStream, turnOffCalls } from '../redux/chatSlice';
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
  const { offerObj, iceCandidates, onGoingCall, peerIces, incomingVoiceCall, socket, remoteStream, localStream, outGoingVoiceCall }   = useAppSelector(selectChat);
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

  const handleEndCall = () => {
    dispatch(turnOffCalls());
    socket.emit('cancelOutgoingVoiceCall', { callReceiverId: outGoingVoiceCall?.id || incomingVoiceCall?.id })
  }

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
        e.streams[0].getTracks().forEach((track) => {
          rmStream.addTrack(track)
        })
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
    <div className="bg-message-bg-blu bg-bg-silver h-screen lg:h-[25rem] flex flex-col justify-between lg:justify-star items-center gap-4 w-full lg:w-[30rem] lg:right-[10px] lg:top-[10px] rounded-[1rem]  py-5 absolute z-30 shadow-[0_0_10px_rgba(0,0,0,0.2)] text-text-primary">
      <audio ref={localAudioRef} hidden autoPlay playsInline></audio>
      <audio ref={remoteAudioRef} hidden autoPlay playsInline></audio>

      <div className=' text-center'>
        <p className=' text-2xl text-text-primary'>{incomingVoiceCall?.username}</p>
        <span className=' text-text-primary text-sm'>{onGoingCall ? formatDuration(callDuration) : 'calling...'}</span>
      </div>
      <img src={incomingVoiceCall?.photo} alt="" className='w-[150px] h-[150px] rounded-full object-cover' />
      { !onGoingCall && 
          <button className='bg-red-500 p-4 rounded-full  animate-pulse' onClick={handleEndCall}>
            <FaPhone className=' text-white' />
          </button>
      }
        {
        onGoingCall && <div className=' w-full self-end flex justify-center items-center gap-4'>
          <button className='bg-red-500 h-[50px] w-[50px] flex justify-center items-center rounded-full' onClick={handleEndCall}>
                <MdCallEnd className=' text-white' />
              </button>
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