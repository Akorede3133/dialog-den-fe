import formatDuration from "../../../utils/formatDuration"
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { addIce, addOffer, selectChat, setLocalStream, setRemotePeerConnection, setRemoteStream, turnOffCalls } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";


const VideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const [hasAnswer, setHasAnswer] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [mutedAudio, setMuteAudio] = useState(false);
  const [disableVideo, setDisableVideo] = useState(false);
  const [callerBigDisplay, setCallerBigDisplay] = useState(true);
  
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { offer, iceCandidates, remoteStream, outGoingVideoCall, socket, peerIces, answer, onGoingCall, localStream, incomingVideoCall }   = useAppSelector(selectChat);

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

  const toggleBigDisplay = () => {
    setCallerBigDisplay((prev) => !prev);
  }

  const handleDisableVideo = () => {
    setDisableVideo((prev) => !prev);
    if (disableVideo) {
      localStream?.getVideoTracks().forEach((track) => {
        track.enabled = true;
      })
    } else {
      localStream?.getVideoTracks().forEach((track) => {
        track.enabled = false;
      })
    }
  }

  const handleEndVideoCall = () => {
    dispatch(turnOffCalls());    
    socket.emit('cancelOutgoingVideoCall', { callReceiverId: outGoingVideoCall?.id || incomingVideoCall?.id })
  }
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      dispatch(setLocalStream(stream))
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      const peerConnection = new RTCPeerConnection(peerConfiguration)
      const rmStream = new MediaStream();  
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = rmStream;
      }
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      })
      const offer = await peerConnection.createOffer();      
      dispatch(addOffer(offer))
      peerConnection.setLocalDescription(offer)
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
  }, [dispatch])

  useEffect(() => {
    if (answer && !hasAnswer) {
      remoteStream.peerConnection?.setRemoteDescription(answer);
      setHasAnswer(true);
    }
  }, [answer, remoteStream.peerConnection, hasAnswer])
  useEffect(() => {
    socket.emit('sendOffer', {offer, receiverId: outGoingVideoCall?.id})
  }, [offer, outGoingVideoCall?.id, socket])

  useEffect(() => {
    if (iceCandidates.length) {
      socket.emit('sendIceCandidate',{ candidate: iceCandidates[iceCandidates.length - 1], iceCandidateOffererId: user?.id })
    }
  }, [iceCandidates, user?.id, socket])

  useEffect(() => {
    if (remoteStream.peerConnection && peerIces.length) {
      peerIces.forEach(async (ice) => {
        await remoteStream.peerConnection?.addIceCandidate(ice);
      })
    }
  }, [peerIces, remoteStream.peerConnection])


  const bigDisplayClass = 'md:w-[700px] rounded-md object-cover absolute z-1 top-0 left-0 w-full h-full';
  const smallDisplayClass = 'absolute h-[150px] w-[150px] object-cover bg-black rounded-md cursor-pointer bottom-[20%] z-10 right-[5%]'
  
  return (
    <div className="h-screen bg-white lg:h-[25rem] flex flex-col justify-between lg:justify-star items-center gap-4 w-full lg:w-[30rem] lg:right-[10px] lg:top-[10px] lg:rounded-[1rem] overflow-hidden  py-5 absolute z-30 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
      <video ref={localVideoRef}  className={callerBigDisplay ? bigDisplayClass : smallDisplayClass} autoPlay muted onClick={!callerBigDisplay ? toggleBigDisplay : () => null}></video>
      <video ref={remoteVideoRef} className={callerBigDisplay ? smallDisplayClass : bigDisplayClass} autoPlay playsInline hidden={!onGoingCall} onClick={callerBigDisplay ? toggleBigDisplay : () => null}></video>

      <div className=' text-center absolute'>
        <p className=' text-2xl text-text-primary'>{outGoingVideoCall?.username}</p>
        <span className=' text-text-primary text-sm'>{onGoingCall ? formatDuration(callDuration) : 'calling...'}</span>
      </div>
      {
        true && <div className=' w-full self-end flex justify-between px-10 items-center gap-4 absolute bottom-0 py-3 bg-bg-dark'>
              <button className='bg-red-500 h-[40px] w-[40px] flex justify-center items-center rounded-full' onClick={handleEndVideoCall}>
                <MdCallEnd className=' text-white' />
              </button>
          { !mutedAudio ? 
           <button className='p-4 rounded-full bg-gray-600' onClick={handleMuteAudio}>
            <BsMicFill className=' text-white text-xl' />
            </button> :
            <button className='p-4 rounded-full bg-gray-600' onClick={handleMuteAudio}>
            <BsMicMuteFill className=' text-white text-xl' />
             </button> }
             { !disableVideo ? 
           <button className='p-4 rounded-full bg-gray-600' onClick={handleDisableVideo}>
            <HiMiniVideoCamera className=' text-white text-xl' />
            </button> :
            <button className='p-4 rounded-full bg-gray-600' onClick={handleDisableVideo}>
            <HiMiniVideoCameraSlash className=' text-white text-xl' />
             </button> }
        </div>
      }
    </div>
  )
}

export default VideoCall