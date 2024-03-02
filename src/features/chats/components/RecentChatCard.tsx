import { FaPhotoFilm } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import { useAppDispatch } from '../../../redux/hooks';
import { formatTime } from '../../../utils/dateTime';
import { UserProp } from '../../contacts/components/ContactCard';
import { setReceiver } from '../redux/chatSlice';
import { HiPhoto } from 'react-icons/hi2';
import { useSocketContext } from '../context/socketContext';

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
  const { senderUsername, receiverUsername, content, type, msgSenderId, msgReceiverId, senderEmail, receiverEmail, createdAt } = chat;
  const dispatch = useAppDispatch();
  const { onlineUsers } = useSocketContext();
  console.log(msgReceiverId, msgReceiverId);
  
  
  const isUserOnline = onlineUsers.includes(msgReceiverId || msgSenderId);

  console.log(isUserOnline);
  
  
  const user = {
    id: msgSenderId || msgReceiverId,
    email: senderEmail || receiverEmail,
    username: senderUsername || receiverUsername
  } as UserProp;
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
         
        </div>
      </section>
      <span className="text-[12px] text-text-gray">{formatTime(createdAt)}</span>
    </li>
  )
}

export default RecentChatCard