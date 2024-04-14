import { useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat } from '../redux/chatSlice';
import { formatTime } from '../../../utils/dateTime';
import { useEffect, useRef, useState } from 'react';
import VoicePlayer from './VoicePlayer';
import { BsCheck2, BsCheck2All } from 'react-icons/bs';

export type MessageProp = {
  id: number;
  content: string;
  type: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

const ConversationBody = () => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(false);
  const { user, isGettingUser } = useCurrentUser();
  const { receiver, socket } = useAppSelector(selectChat);
  const [socketMessages, setSocketMessages] = useState<MessageProp[]>([]);
  const { messages, isPending, error } = useGetMessages(receiver?.id as number);
  const ref = useRef<HTMLLIElement>(null);
    
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

    socket.on('getMessage', handleMessage);

    return () => {
      socket.off('getMessage', handleMessage);
    }
  }, [socket, messages])
  useEffect(() => {
    const scrollToBottom = () => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    };
    scrollToBottom();
    if (scrollToBottom) {
      scrollToBottom();
      setScrollToBottom(false); 
    }
  }, [socketMessages, scrollToBottom]);

  
  if (isPending || isGettingUser) {
    return <p className='min-h-screen'>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
    
  return (
    <div className="bg-[#EFF7FE] overflow-auto flex-1 convo p-3">
      <ul className="flex flex-col gap-4">
        {
          socketMessages.map((message: MessageProp, index: number) => {                                    
            const { content, senderId, id, status } = message;
            const isSender = senderId === user?.id;

            const senderTextClass = messages[index - 1]?.senderId == user?.id ? ' rouded-[50px_0px_50px_50px]' : 'rouded-[50px_50px_0_50px]'
            const receiverTextClass = messages[0] === message || messages[index - 1]?.receiverId == receiver?.id ? 'rounded-md rouded-[50px_50px_50px_0px] rounded-md' : 'rouded-[0px_50px_50px_50px]';

            return (
              <li  ref={ref} key={id} className={`${isSender ? 'self-end' : 'self-start'} flex flex-col max-w-[60%]`}>
                { isSender && (!messages[index - 1 ] || messages[index - 1]?.receiverId == user?.id ) && <div className='flex items-start gap-3 pb-2 mb-[-5px] text-sm self-end'>
                  <span>{user?.username}</span>
                  <img src={user?.photo} alt="" className='h-[40px] w-[40px] rounded-full object-cover' />
                </div> }
                { !isSender && (!messages[index - 1 ] || messages[index - 1]?.senderId == user?.id ) && <div className='flex items-start self-start gap-3 text-sm mb-[-15px]'>
                  <img src={user?.photo} alt="" className='h-[40px] w-[40px]  rounded-full object-cover' />
                  <span>{receiver?.username}</span>
                </div> }
                {
                  message.type === 'text' &&  
                  <div className={`${isSender ? `${senderTextClass} mr-[3.2rem] bg-bg-silver`  : `bg-[#1C9DEA] ${receiverTextClass} ml-[3.2rem] text-white`} px-1 py-3 flex flex-col gap-2 relative w-full`}>
                    <span className='text-sm wrap-text mb-2'>{content}</span>
                    <div className='flex gap-1 items-center absolute bottom-[1%] right-[5%]'>
                      <span className={`text-[10px] ${isSender ?' text-text-primary' : 'text-gray-300'}`}>{formatTime(message.createdAt)}</span>
                      { isSender && 
                          <div className=''>
                            { status === 'sent' && <BsCheck2 /> }
                            { status === 'delivered' && <BsCheck2All /> }
                            { status === 'read' && <BsCheck2All className=' text-blue-900' /> }

                          </div> 
                      }
                    </div>
                  </div>
                }
                {
                  message.type === 'image' && 
                  <div className={`${isSender ? `${senderTextClass} mr-[3.2rem] bg-bg-silver`  : `bg-[#1C9DEA] ${receiverTextClass} ml-[3.2rem] text-white`} p-3 flex items-center gap-2 w-[150px] `}>
                    <img src={content} alt="" className=' object-cover rounde w-full h-full' />
                  </div>
                }
                { message.type === 'voice' && <VoicePlayer content={content} isSender={isSender}  /> }
                
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ConversationBody