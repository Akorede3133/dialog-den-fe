import { useEffect, useRef, useState } from "react"
import { FaPause, FaPlay } from "react-icons/fa6";
import formatDuration from "../../../utils/formatDuration";
import WaveSurfer from "wavesurfer.js";

const VoicePlayer = ({ content }: { content: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration ,setTotalDuration] = useState(0)
  const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null)  

  const waveFormRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: '#ccc',
      progressColor: '#4a9eff',
      height: 30,
      cursorColor: '#7ae3c3',
      cursorWidth: 1,
      barWidth: 2,
      responsive: true,
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
    }
  }, [waveForm, content])

  useEffect(() => {
    waveForm?.on('audioprocess', () => {
      setCurrentTime(waveForm.getCurrentTime());
    })
    waveForm?.on('ready', () => {
      setTotalDuration(waveForm?.getDuration() as number);
    })
  }, [waveForm])

  const handlePlayRecord = () => {
    waveForm?.play();
    setIsPlaying(true);
  }
  const handlePauseRecord = () => {
    waveForm?.pause();
    setIsPlaying(false);
  }
  return (
    <div className=" shadow-lg bg-white p-3 rounded space-y-2 mt-3">
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
      <div className="flex justify-between text-sm">
        { isPlaying ? <span>{formatDuration(currentTime)}</span> : <span>{formatDuration(totalDuration)}</span> }
        <span>7:58am</span>
      </div>
    </div>
  )
}

export default VoicePlayer