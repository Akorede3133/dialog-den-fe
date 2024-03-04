import { useEffect, useRef, useState } from "react"
import { FaMicrophone, FaPause, FaPlay, FaStop, FaTrash } from "react-icons/fa6"
import { HiPaperAirplane } from "react-icons/hi2";
import WaveSurfer from "wavesurfer.js";

const SendVoiceMessage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsplaying] = useState(false);
  const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  // const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [audioFile, setAudioFile] = useState<File>({} as File)

  const waveFormRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null)
  
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
    });
    setWaveForm(waveSurfer)
    waveSurfer.on('finish', () => {
      setIsplaying(false);
    })
    return () => {
      waveSurfer.destroy();
    }
 
  }, [])

  useEffect(() => {
    if (waveForm) {
      handleStartRecording();
    }
  }, [waveForm])
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingDuration((duration) => {
          setTotalDuration(duration + 1);
          return duration + 1;
        })
      }, 1000)
      return () => {
        clearInterval(interval);
      }
    }
  }, [isRecording])

  useEffect(() => {
    if (waveForm) {
      waveForm.on('audioprocess', () => {
        const currentTime = waveForm.getCurrentTime();
        setCurrentTime(currentTime);
      })
    }
  }, [waveForm, currentTime])

  const handleStartRecording = async () => {
    setIsRecording(true);
    setRecordingDuration(0);

    if (navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        }
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });       
          const audioURL = URL.createObjectURL(blob);
          // const audio = new Audio(audioURL);
          // setRecordedAudio(audio);          
          waveForm?.load(audioURL);
        }
        mediaRecorder.start();
        
      } catch (error) {
        console.error(`The following getUserMedia error occurred: ${error}`);
      }
    }
  }
  const handleStopRecording = () => {
    setIsRecording(false);

    mediaRecorder?.stop();
    waveForm?.stop();
    let audioChunks: Blob[] = [];
    mediaRecorder?.addEventListener('dataavailable', (e) => {
      audioChunks.push(e.data)
    })
    mediaRecorder?.addEventListener('stop', () => {      
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' })
      const audioFile = new File([audioBlob], 'recording.mp3');
      setAudioFile(audioFile);
      audioChunks = [];
    })
  }
  const handlePlayRecord = () => {
      waveForm?.play();
      setIsplaying(true);
  }
  const handlePauseRecord = () => {
      waveForm?.pause();
      setIsplaying(false);
  }
  const formatDuration = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return duration;
  }
  return (
    <div className="flex justify-end items-center gap-10 px-4">
      <FaTrash className=" text-message-bg-blue text-xl" />
      { isRecording ? 
          <div className=" animate-pulse text-sm text-text-primary">
            <p>Recording <span>{formatDuration(recordingDuration)}</span></p>
          </div>
        : <div>
            { 
              <div className="flex items-center gap-4">
                {
                  isPlaying ? <FaPause className=" text-text-gray"  onClick={handlePauseRecord}/>
                  : <FaPlay onClick={handlePlayRecord} className=" text-text-primary text-xl" />
                }
            </div>
          }
        </div>
      }
      <div ref={waveFormRef} className="w-[160px] sm:w-60 shadow-md" hidden={isRecording} />
      {  isPlaying && <span>{formatDuration(currentTime)}</span> }
      {  !isPlaying && <span>{formatDuration(totalDuration)}</span> }
      <div>
        {
          isRecording ? <FaStop onClick={handleStopRecording} className="text-red-500 text-2xl" />
          : <FaMicrophone onClick={handleStartRecording} className="text-red-500 text-xl" />
        }
      </div>
      <HiPaperAirplane className=" text-message-bg-blue text-2xl" />
      <audio ref={audioRef} src="" controls hidden></audio>
    </div>
  )
}

export default SendVoiceMessage