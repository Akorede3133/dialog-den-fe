import logo from '../../../assets/logo.png';
import { formatTime } from '../../../utils/dateTime';

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
  const { senderUsername, receiverUsername, content, createdAt } = chat;
  return (
    <li className="flex justify-between items-center">
      <section className="flex items-center gap-4">
        <div className='relative w-[30px] h-[30px]'>
          <img src={logo} alt="" className='w-fu;ll h-full rounded-full'/>
          <span className='bg-green-500 h-[10px] w-[10px] rounded-full border border-white absolute top-[50%] right-0'></span>
        </div>
        <div className="flex flex-col">
          <span>{senderUsername || receiverUsername}</span>
          <span className="text-sm text-text-gray">{content}</span>
        </div>
      </section>
      <span className="text-[12px] text-text-gray">{formatTime(createdAt)}</span>
    </li>
  )
}

export default RecentChatCard