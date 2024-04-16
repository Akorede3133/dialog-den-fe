import formatDuration from "../../../utils/formatDuration"
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import CallWindow from "./CallWindow";
import { MdCallEnd } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { addAnswer, addIce, selectChat, setLocalStream, setRemotePeerConnection, setRemoteStream } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";


const ReceiverVideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)  
  const [hasAnswer, setHasAnswer] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [mutedAudio, setMuteAudio] = useState(false);
  const [disableVideo, setDisableVideo] = useState(false);


  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { offerObj, iceCandidates, remoteStream, incomingVideoCall, socket, peerIces, onGoingCall, localStream }   = useAppSelector(selectChat);

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
      peerConnection.addEventListener('connectionstatechange', () => {
        console.log(peerConnection.connectionState);
      })
    }
    getMedia();
  }, [dispatch, offerObj?.offer])

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
    <div className="bg-message-bg-blue min-h-screen flex flex-col justify-between items-center gap-20 w-full py-5 z-10 relative overflow-hidden">
       <video ref={localVideoRef} className=" w-[90%] h-[60%] md:w-[700px] rounded-md object-cover absolute z-1 top-[20%]" autoPlay muted></video>
       <video ref={remoteVideoRef} className=" absolute h-[200px] w-[200px] object-cover bg-black bottom-[20%] right-[5%]" autoPlay playsInline></video>

      <div className=' text-center'>
        <p className=' text-2xl text-white'>{incomingVideoCall?.username}</p>
        <span className='text-white text-sm'>{onGoingCall ? formatDuration(callDuration) : 'calling...'}</span>
      </div>
      {
        true && <div className=' w-full self-end flex justify-center items-center gap-4'>
            <CallWindow>
            <CallWindow.Close callType="video" localVideoRef={localVideoRef}>
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

export default ReceiverVideoCall;