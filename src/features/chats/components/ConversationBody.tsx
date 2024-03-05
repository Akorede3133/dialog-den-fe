import logo from '../../../assets/logo.png';
import { useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat } from '../redux/chatSlice';
import { formatTime } from '../../../utils/dateTime';
import { useEffect, useRef, useState } from 'react';
import { useSocketContext } from '../context/socketContext';
import VoicePlayer from './VoicePlayer';

export type MessageProp = {
  id: number;
  content: string;
  type: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  updatedAt: string;
}

const ConversationBody = () => {
  const { receiver } = useAppSelector(selectChat);
  const { socket } = useSocketContext();
  const [socketMessages, setSocketMessages] = useState<MessageProp[]>([]);
  const { messages, isPending, error } = useGetMessages(receiver?.id as number);

  useEffect(() => {
    if (messages) {
      setSocketMessages(messages)
    }
  }, [messages])

  useEffect(() => {    
    const handleMessage = (message: MessageProp) => {
      setSocketMessages((prevMessage) => {
        return [...prevMessage, message];
      });
    };

    socket?.on('getMessage', handleMessage);

    return () => {
      socket?.off('getMessage', handleMessage);
    }
  }, [socket, messages])

  const { user, isGettingUser } = useCurrentUser();

  const ref = useRef<HTMLDivElement>(null);  
  
  if (isPending || isGettingUser) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
    
  return (
    <div  ref={ref} className="bg-[#EFF7FE] overflow-auto convo p-3">
      <ul className="flex flex-col gap-4">
        {
          socketMessages.map((message: MessageProp, index: number) => {                                    
            const { content, senderId, id } = message;

            const isSender = senderId === user?.id;

            const senderTextClass = messages[index - 1]?.senderId == user?.id ? ' rounded-[50px_0px_50px_50px]' : 'rounded-[50px_50px_0_50px]'
            const receiverTextClass = messages[0] === message || messages[index - 1]?.receiverId == receiver?.id ? 'rounded-[50px_50px_50px_0px]' : 'rounded-[0px_50px_50px_50px]';

            return (
              <li key={id} className={`${isSender ? 'self-end' : 'self-start'} flex flex-col`}>
                { isSender && (!messages[index - 1 ] || messages[index - 1]?.receiverId == user?.id ) && <div className='flex items-start gap-3 pb-2 mb-[-15px] text-sm self-end'>
                  <span>{user?.username}</span>
                  <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full' />
                </div> }
                { !isSender && (!messages[index - 1 ] || messages[index - 1]?.senderId == user?.id ) && <div className='flex items-start self-start gap-3 text-sm mb-[-15px]'>
                  <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full' />
                  <span>{receiver?.username}</span>
                </div> }
                {
                  message.type === 'text' &&  <p className={`${isSender ? `${senderTextClass} mr-[3.2rem] bg-bg-silver`  : `bg-[#1C9DEA] ${receiverTextClass} ml-[3.2rem] text-white`} p-3 flex items-center gap-2 `}>
                  <span className='text-sm'>{content}</span>
                <span className={`text-[12px] ${isSender ?' text-text-primary' : 'text-gray-300'}`}>{formatTime(message.createdAt)}</span>

                </p>
                }
                {
                  message.type === 'image' && 
                  <div className={`${isSender ? `${senderTextClass} mr-[3.2rem] bg-bg-silver`  : `bg-[#1C9DEA] ${receiverTextClass} ml-[3.2rem] text-white`} p-3 flex items-center gap-2 w-[150px] `}>
                    <img src={content} alt="" className=' object-cover rounde w-full h-full' />
                  </div>
                }
                { message.type === 'voice' && <VoicePlayer content={content} /> }
                
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ConversationBody