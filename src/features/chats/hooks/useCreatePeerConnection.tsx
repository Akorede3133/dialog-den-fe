import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useAppSelector } from "../../../redux/hooks"
import { selectChat } from "../redux/chatSlice"

const useCreatePeerConnection = () => {
  const peerConnectionRef = useRef<RTCPeerConnection>()
  const { localStream } = useAppSelector(selectChat)
  useEffect(()=> {
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
    const peerConnection = new RTCPeerConnection(peerConfiguration)
    if (localStream.active) {
      localStream.getAudioTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
      })
    }
    peerConnection.addEventListener('icecandidate', (e) => {
      if (e.candidate) {
        console.log(e.candidate);
        
      }
    })
    peerConnection.addEventListener('track', (e) => {
      console.log(e);
      
    })
    peerConnection.addEventListener('signalingstatechange', (e) => {
      console.log(e);
      
    })
    peerConnectionRef.current = peerConnection
  }, [])
  return { peerConnection: peerConnectionRef.current }
}

export default useCreatePeerConnection