import { useEffect, useState } from "react"

const useFetchVoiceMedia = () => {
  const [stream, setStream] = useState<MediaStream>(new MediaStream())
  useEffect(() => {
    const fetchVoice = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true})
      setStream(stream);
    }
    fetchVoice();
  }, [])
  return { stream }
}

export default useFetchVoiceMedia