import { FaMicrophone } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { formatTime } from '../../../utils/dateTime';
import { UserProp } from '../../contacts/components/ContactCard';
import { displayCoversation, selectChat, setReceiver, setRecentChats } from '../redux/chatSlice';
import { HiPhoto } from 'react-icons/hi2';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import formatDuration from '../../../utils/formatDuration';

export type MessageSenderProp = {
  senderId: number;
  senderUsername: string;
  senderEmail: string;
  senderPhoto: string;
}
export type MessageReceiverProp = {
  receiverId: number;
  receiverUsername: string;
  receiverEmail: string;
  receiverPhoto: string;
}
export type ChatProp =  {
  messageId?: number;
  content: string;
  id?: number;
  type: string;
  createdAt: string;
  updatedAt?: string;
  user: MessageSenderProp & MessageReceiverProp;
  count: number;
  status: string;
};
const RecentChatCard = ({ chat }: { chat: ChatProp }) => {
  const [totalDuration, setTotalDuration] = useState
  (0);
  const {onlineUsers} = useAppSelector(selectChat)  
  const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null) 
  
  const waveFormRef = useRef<HTMLDivElement>(null)
  
  const { content, type, user, createdAt, count } = chat;
  const dispatch = useAppDispatch();


    
  const isUserOnline = onlineUsers.includes(user?.receiverId as number || user?.senderId as number);
    
  const convo = {
    id: user?.senderId || user?.receiverId,
    email: user?.senderEmail || user?.receiverEmail,
    username: user?.senderUsername || user?.receiverUsername,
    photo: user?.senderPhoto || user?.receiverPhoto,
  } as UserProp;
  
  const handleSelectChat = () => {    
    dispatch(setReceiver(convo));
    dispatch(displayCoversation(true));
  }


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
    <li className="flex cursor-pointer justify-between items-center" onClick={handleSelectChat}>
      <section className="flex items-center gap-4">
        <div className='relative w-[30px] h-[30px]'>
          <img src={convo.photo} alt="" className='w-full h-full rounded-full object-cover'/>
          { isUserOnline && <span className='bg-green-500 h-[10px] w-[10px] rounded-full border border-white absolute top-[50%] right-0'></span> }
        </div>
        <div className="flex flex-col">
          <span>{user?.senderUsername || user?. receiverUsername}</span>
          {
            type === 'text' && <span className="text-sm text-text-gray line-clamp-2">{content.length > 50 ?content.replace(/\n/g, '').slice(0, 35) +'...' : content}</span>
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
      <div className='flex flex-col items-center gap-1'>
        <span className="text-[12px] text-text-gray">{formatTime(createdAt)}</span>
        { count ? <span className='text-sm text-message-count-text bg-red-200 w-[20px] h-[20px] rounded-full text-center'>{count}</span> : null }
      </div>
    </li>
  )
}

export default RecentChatCard