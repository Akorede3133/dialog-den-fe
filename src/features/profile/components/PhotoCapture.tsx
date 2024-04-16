import { useEffect, useRef, useState } from "react"
import { FaCheck } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useCurrentUser from "../../auth/hooks/useCurrentUser";

const PhotoCapture = ({ hideCapture }: { hideCapture: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [photoTaken, setPhotoTaken] = useState(false);
  const [imgFile, setImgFile] = useState<File>();
  const [imgUrl, setImgUrl] = useState('');
  const { updateUserProfile } = useUpdateProfile();
  const { user } = useCurrentUser();

  

  const handlePhotoUpload = () => {
    const data: { username: string, photo: File } = {
      photo: imgFile as File,
      username: user?.username as string,
    }

    updateUserProfile({ userId: user?.id as number, data }, {
      onSuccess: () => {
        hideCapture();
      }
    })
  }
  const capturePhoto = () => {
    if (videoRef.current) {
      const context = canvasRef.current?.getContext('2d');
      if (context) {
         context.imageSmoothingEnabled = true;
         context.drawImage(videoRef?.current as HTMLVideoElement, 0, 0, 800, 600);
      }
    
      const url = canvasRef.current?.toDataURL()
      setImgUrl(url as string);
      setPhotoTaken(true);
      canvasRef.current?.toBlob((blob) => {
        const file = new File([blob as Blob], 'image.jpg', { type: 'image/jpeg' });
        setImgFile(file);
        
      })
    }    
  }
  useEffect(() => {
    let stream = new MediaStream();
    
    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

    }
    startCamera();


    return () => {            
      stream.getTracks().forEach((track) => {        
        track.stop();
      })
    }


  }, [])
  return (
    <div className="absolute z-[1] min-h-screen top-0 left-0 w-full">
      <video ref={videoRef} className="w-full h-[80vh] bg-black" hidden={photoTaken} autoPlay></video>
      <img src={imgUrl} alt="" className="w-full h-[80vh] bg-black object-cover" hidden={!photoTaken} />
      <canvas ref={canvasRef} hidden width={800} height={600} ></canvas>
      <div className="flex items-center justify-center gap-10 my-5">
        <button className=" bg-bg-dark h-[50px] w-[50px] flex justify-center items-center rounded-full" onClick={hideCapture}>
          <HiOutlineXMark className="text-2xl text-white" />
        </button>
        { photoTaken && <button  className=" bg-bg-dark h-[50px] w-[50px] flex justify-center items-center rounded-full" onClick={handlePhotoUpload}>
          <FaCheck className="text-2xl text-white" />
        </button>}
        { photoTaken ||  <button className=" w-[50px] h-[50px] rounded-full overflow-hidden hover:opacity-65 my-2" onClick={capturePhoto}>
          <div className="bg-white rounded-full w-full h-full border-[7px] border-bg-dark ">
          </div>
        </button>}
      </div>
    </div>
  )
}

export default PhotoCapture