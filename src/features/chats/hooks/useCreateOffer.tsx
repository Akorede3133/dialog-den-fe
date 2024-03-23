import { useEffect } from "react";
import useCreatePeerConnection from "./useCreatePeerConnection"

const useCreateOffer = () => {
  const { peerConnection } = useCreatePeerConnection();
  useEffect(() => {
    console.log(peerConnection);
    const createOffer = async() => {
      const offer = await peerConnection?.createOffer();
      peerConnection?.setLocalDescription(offer);
    }
    createOffer();  
  }, [peerConnection])
  return (
    <div>useCreateOffer</div>
  )
}

export default useCreateOffer