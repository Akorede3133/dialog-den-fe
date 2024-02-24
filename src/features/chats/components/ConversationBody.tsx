import { format, formatDate } from 'date-fns';
import logo from '../../../assets/logo.png';
import { useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat } from '../redux/chatSlice';
import { formatTime } from '../../../utils/dateTime';
const ConversationBody = () => {
  type MessageProp = {
    id: number;
    content: string;
    type: string;
    senderId: number;
    receiverId: number;
    createdAt: string;
    updatedAt: string;
  }

  const { receiver } = useAppSelector(selectChat);

  const { messages, isPending, error } = useGetMessages(receiver?.id as number);

  const { user, isGettingUser } = useCurrentUser();

  if (isPending || isGettingUser) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  
  return (
    <div className="bg-[#EFF7FE] overflow-auto convo p-3">
      <ul className="flex flex-col gap-4">
        {
          messages.map((message: MessageProp, index: number) => {            
            const { content, senderId } = message;

            const isSender = senderId === user?.id;

            const senderTextClass = messages[index - 1]?.senderId == user?.id ? ' rounded-[50px_0px_50px_50px]' : 'rounded-[50px_50px_0_50px]'
            const receiverTextClass = messages[0] === message || messages[index - 1]?.receiverId == receiver?.id ? 'rounded-[50px_50px_50px_0px]' : 'rounded-[0px_50px_50px_50px]';

            return (
              <li className={`${isSender ? 'self-end' : 'self-start'} flex flex-col`}>
                { isSender && (!messages[index - 1 ] || messages[index - 1]?.receiverId == user?.id ) && <div className='flex items-start gap-3 pb-2 mb-[-15px] text-sm self-end'>
                  <span>{user?.username}</span>
                  <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full' />
                </div> }
                { !isSender && (!messages[index - 1 ] || messages[index - 1]?.senderId == user?.id ) && <div className='flex items-start self-start gap-3 text-sm mb-[-15px]'>
                  <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full' />
                  <span>{receiver?.username}</span>
                </div> }
                <p className={`${isSender ? `${senderTextClass} mr-[3.2rem] bg-bg-silver`  : `bg-[#1C9DEA] ${receiverTextClass} ml-[3.2rem] text-white`} p-3 flex items-center gap-2 `}>
                  <span className='text-sm'>{content}</span>
                <span className={`text-[12px] ${isSender ?' text-text-primary' : 'text-gray-300'}`}>{formatTime(message.createdAt)}</span>

                </p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ConversationBody