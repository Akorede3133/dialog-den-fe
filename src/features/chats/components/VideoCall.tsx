import formatDuration from "../../../utils/formatDuration"
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import CallWindow from "./CallWindow";
import { MdCallEnd } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { addIce, addOffer, addPeerIce, selectChat, setRemotePeerConnection, setRemoteStream } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useCurrentUser from "../../auth/hooks/useCurrentUser";


const VideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const [hasAnswer, setHasAnswer] = useState(false);
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { offer, iceCandidates, remoteStream, outGoingVideoCall, socket, peerIces, answer }   = useAppSelector(selectChat);
    
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
      dispatch(setRemotePeerConnection(peerConnection))
      dispatch(setRemoteStream(rmStream))
      peerConnection.addEventListener('connectionstatechange', () => {
        console.log(peerConnection.connectionState);
        
      })
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

  return (
    <div className="bg-message-bg-blue min-h-screen flex flex-col justify-between items-center gap-20 w-full py-5 z-10 relative overflow-hidden">
      <video ref={localVideoRef} className="absolute min-h-screen top-0 w-full" autoPlay></video>

      <div className=' text-center'>
        <p className=' text-2xl text-white'>{outGoingVideoCall?.username}</p>
        <span className='text-white text-sm'>{false ? formatDuration(0) : 'calling...'}</span>
      </div>
      {
        true && <div className=' w-full self-end flex justify-center items-center gap-4'>
            <CallWindow>
            <CallWindow.Close>
              <button className='bg-red-500 h-[50px] w-[50px] flex justify-center items-center rounded-full'>
                <MdCallEnd className=' text-white' />
              </button>
            </CallWindow.Close>
          </CallWindow>
           { !true ? 
           <button className='p-4 rounded-full bg-gray-600'>
            <BsMicFill className=' text-white text-xl' />
            </button> :
            <button className='p-4 rounded-full bg-gray-600'>
            <BsMicMuteFill className=' text-white text-xl' />
             </button> }
        </div>
      }
       <video ref={remoteVideoRef} className=" absolute h-[250px] w-[250px] object-cover bg-black bottom-[20%] right-[5%]" autoPlay playsInline></video>

    </div>
  )
}

export default VideoCall