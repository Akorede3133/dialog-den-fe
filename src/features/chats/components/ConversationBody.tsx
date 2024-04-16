import { useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat } from '../redux/chatSlice';
import { useEffect, useState } from 'react';
import MessageCard, { MessageProp } from './MessageCard';


const ConversationBody = () => {
  const { isGettingUser } = useCurrentUser();
  const { receiver, socket } = useAppSelector(selectChat);
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

    socket.on('getMessage', handleMessage);

    return () => {
      socket.off('getMessage', handleMessage);
    }
  }, [socket, messages])
 
  
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
            return (
              <MessageCard message={message} messages={socketMessages} index={index} />
            )
          })
        }
      </ul>
    </div>
  )
}

export default ConversationBody