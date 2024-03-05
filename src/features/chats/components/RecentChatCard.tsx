import { FaMicrophone, FaPhotoFilm } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import { useAppDispatch } from '../../../redux/hooks';
import { formatTime } from '../../../utils/dateTime';
import { UserProp } from '../../contacts/components/ContactCard';
import { setReceiver } from '../redux/chatSlice';
import { HiPhoto } from 'react-icons/hi2';
import { useSocketContext } from '../context/socketContext';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import formatDuration from '../../../utils/formatDuration';

export type ChatProp =  {
  messageId: number;
  content: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  senderId: number;
  receiverId: number;
  msgSenderId?: number;
  msgReceiverId?: number;
  senderUsername?: string;
  receiverUsername?: string;
  senderEmail?: string;
  receiverEmail?: string;
};
const RecentChatCard = ({ chat }: { chat: ChatProp }) => {
  const [totalDuration ,setTotalDuration] = useState
  (0);
  const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null) 
  
  const waveFormRef = useRef<HTMLDivElement>(null)
  
  const { senderUsername, receiverUsername, content, type, msgSenderId, msgReceiverId, senderEmail, receiverEmail, createdAt } = chat;
  const dispatch = useAppDispatch();
  const { onlineUsers } = useSocketContext();
    
  const isUserOnline = onlineUsers.includes(msgReceiverId as number || msgSenderId as number);
  
  const user = {
    id: msgSenderId || msgReceiverId,
    email: senderEmail || receiverEmail,
    username: senderUsername || receiverUsername
  } as UserProp;

  useEffect(() => {
    if (waveForm) {
      waveForm.load(content)
      waveForm.on('ready', () => {
        setTotalDuration(waveForm.getDuration() as number)
      })
    }
  }, [waveForm, content])
  
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current as HTMLDivElement,
    })
    setWaveForm(waveSurfer)
  }, [])
  return (
    <li className="flex cursor-pointer justify-between items-center"  onClick={() => dispatch(setReceiver(user))}>
      <section className="flex items-center gap-4">
        <div className='relative w-[30px] h-[30px]'>
          <img src={logo} alt="" className='w-fu;ll h-full rounded-full'/>
          { isUserOnline && <span className='bg-green-500 h-[10px] w-[10px] rounded-full border border-white absolute top-[50%] right-0'></span> }
        </div>
        <div className="flex flex-col">
          <span>{senderUsername || receiverUsername}</span>
          {
            type === 'text' && <span className="text-sm text-text-gray">{content}</span>
          }

          {
            type === 'image' && <div className=' flex items-center gap-3'>
              <span className='text-sm'>Photo</span>
              <HiPhoto className=' text-text-gray' />
            </div>
          }
            {
            type === 'voice' && <div className=' flex items-center gap-3'>
              <span className='text-sm'>
                <FaMicrophone className=' text-text-gray text-[0.7rem]' />
              </span>
              <p className='text-[0.7rem]'>
                {formatDuration(totalDuration)}
              </p>
            </div>
          }
         
        </div>
      </section>
      <div ref={waveFormRef} hidden></div>

      <span className="text-[12px] text-text-gray">{formatTime(createdAt)}</span>
    </li>
  )
}

export default RecentChatCard