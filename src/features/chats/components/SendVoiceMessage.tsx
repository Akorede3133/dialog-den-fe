import { useState } from "react"
import { FaMicrophone, FaPause, FaPlay, FaStop, FaTrash } from "react-icons/fa6"
import { HiPaperAirplane } from "react-icons/hi2";

const SendVoiceMessage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsplaying] = useState(false);
  return (
    <div className="flex justify-end items-center gap-10 px-4">
      <FaTrash className=" text-message-bg-blue text-xl" />
      { isRecording ? 
        <div className=" animate-pulse text-sm text-text-primary">
         <p>Recording <span>0:44</span></p>
        </div>
        : <div>
          <div className="flex items-center gap-4">
            {
              isPlaying ? <FaPause className=" text-text-gray" />
              : <FaPlay className=" text-text-primary text-xl" />
            }
            <div className="w-[200px]">
              WaveForm
            </div>
            <div>
              <span>0:33</span>
            </div>
          </div>
        </div>
      }
      <div>
        {
          isRecording ? <FaStop className="text-red-500 text-2xl" />
          : <FaMicrophone className="text-red-500 text-xl" />
        }
      </div>
      <HiPaperAirplane className=" text-message-bg-blue text-2xl" />
    </div>
  )
}

export default SendVoiceMessage