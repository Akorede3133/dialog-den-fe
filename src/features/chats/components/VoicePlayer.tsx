import { useState } from "react"
import { FaPause, FaPlay } from "react-icons/fa6";
import formatDuration from "../../../utils/formatDuration";

const VoicePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration ,setTotalDuration] = useState(0)
  return (
    <div className=" shadow-lg bg-white p-3 rounded space-y-2 mt-3">
      <div>
        <div>
          {
            isPlaying ? <FaPause /> : <FaPlay />
          }
        </div>
        <div className="w-[250px]"></div>
      </div>
      <div className="flex justify-between text-sm">
        { isPlaying ? <span>{formatDuration(currentTime)}</span> : <span>{formatDuration(totalDuration)}</span> }
        <span>7:58am</span>
      </div>
    </div>
  )
}

export default VoicePlayer