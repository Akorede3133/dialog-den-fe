import { format, formatDate } from 'date-fns';
import logo from '../../../assets/logo.png';
import { useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat } from '../redux/chatSlice';
const ConversationBody = () => {
  const { receiver } = useAppSelector(selectChat);
  const { messages, isPending, error } = useGetMessages(receiver?.id as number);
  const { user, isGettingUser } = useCurrentUser();
  if (isPending || isGettingUser) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  console.log(user);
  
  return (
    <div className="bg-[#EFF7FE] overflow-auto convo p-3">
      <ul className="flex flex-col gap-4">
        {
          messages.map((message, index) => {            
            const { content, type, senderId, receiverId  } = message;
            const isSender = senderId === user?.id;
            const senderContainerClass = isSender ? 'self-end' : 'self-start';  
            const senderTextClass = messages[index - 1]?.senderId == user?.id ? ' rounded-[50px_0px_50px_50px]' : 'rounded-[50px_50px_0_50px]'
            const receiverTextClass = messages[0] === message || messages[index - 1]?.receiverId == receiver?.id ? 'rounded-[50px_50px_50px_0px]' : 'rounded-[0px_50px_50px_50px]'
            console.log(messages[index - 1]);
            const time = new Date(message.createdAt)
            const hour = time.getHours();
            const minutes = time.getMinutes();
            const formattedTime = `${hour}:${minutes} `;

            return (
              <li className={senderContainerClass}>
                { isSender && (!messages[index - 1 ] || messages[index - 1]?.receiverId == user?.id ) && <div className='flex items-start gap-3 pb-2 mb-[-15px] text-sm'>
                  <span>{user?.username}</span>
                  <span>01:40am</span>
                  <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full' />
                </div> }
                { !isSender && (!messages[index - 1 ] || messages[index - 1]?.senderId == user?.id ) && <div className='flex items-start gap-3 text-sm mb-[-15px]'>
                  <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full' />
                  <span>{receiver?.username}</span>
                  <span>01:am</span>
                </div> }
                <p className={`${isSender ? `${senderTextClass} mr-[3.5rem] bg-bg-silver`  : `bg-[#1C9DEA] ${receiverTextClass} ml-[3.2rem] text-white`} p-3 `}>{content}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ConversationBody