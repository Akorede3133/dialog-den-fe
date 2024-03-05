import { useEffect, useRef, useState } from "react"
import { FaPause, FaPlay } from "react-icons/fa6";
import formatDuration from "../../../utils/formatDuration";
import WaveSurfer from "wavesurfer.js";

const VoicePlayer = ({ content, isSender }: { content: string, isSender: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration ,setTotalDuration] = useState(0)
  const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null)  

  const waveFormRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current as HTMLDivElement,
      waveColor: `${isSender ? '#343a40'  : '#ccc'}`,
      progressColor: `${isSender ? '#878a92' : '#4a9eff'}`,
      height: 30,
      cursorColor: '#7ae3c3',
      cursorWidth: 1,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      barHeight: 2,
      hideScrollbar: true,
    })
    setWaveForm(waveSurfer);
    waveSurfer.on('finish', () => {
      setIsPlaying(false);
    })
  }, [])
  

  useEffect(() => {
    if (waveForm) {
      waveForm.load(content)
      waveForm.on('audioprocess', () => {
        setCurrentTime(waveForm.getCurrentTime());
      })
      waveForm.on('ready', () => {
        setTotalDuration(waveForm?.getDuration() as number);
      })
    }
  }, [waveForm, content])

  const handlePlayRecord = () => {
    waveForm?.play();
    setIsPlaying(true);
  }
  const handlePauseRecord = () => {
    waveForm?.pause();
    setIsPlaying(false);
  }
  return (
    <div  className={`${isSender ? ` mr-[3.2rem] bg-bg-silver` : `bg-[#1C9DEA] ml-[3.2rem] text-white`} px-2 pb-2 rounded flex flex-col gap-2 `}>
      <div className="flex items-center gap-2">
        <div>
          {
            isPlaying ? <FaPause onClick={handlePauseRecord} /> : <FaPlay onClick={handlePlayRecord} />
          }
        </div>
        <div className="w-[200px] h-[50px] overflow-hidden">
          <div ref={waveFormRef} className="w-full mt-[-19px] bg-red" ></div>
        </div>
      </div>
      <div className="flex justify-between text-[0.7rem]">
        { isPlaying ? <span>{formatDuration(currentTime)}</span> : <span>{formatDuration(totalDuration)}</span> }
        <span>7:58am</span>
      </div>
    </div>
  )
}

export default VoicePlayer