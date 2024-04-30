import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat, setConversationMessages } from '../redux/chatSlice';
import { useEffect } from 'react';
import MessageCard, { MessageProp } from './MessageCard';
import { useQueryClient } from '@tanstack/react-query';


const ConversationBody = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isGettingUser } = useCurrentUser();
  const { receiver, socket, conversationMessages, searchMatches, messageSearchMode } = useAppSelector(selectChat);
  const { messages, isPending, error } = useGetMessages(receiver?.id as number);
      
  useEffect(() => {
    if (messages) {
      dispatch(setConversationMessages(messages))
    }
  }, [messages, dispatch])

  useEffect(() => {    
    const handleMessage = (message: MessageProp) => {
      dispatch(setConversationMessages([...conversationMessages, message]))
      queryClient.invalidateQueries({ queryKey: ['recentChats']})
    };

    socket.on('getMessage', handleMessage);

    return () => {
      socket.off('getMessage', handleMessage);
    }
  }, [socket, dispatch, conversationMessages, queryClient])
 
  
  if (isPending || isGettingUser) {
    return <p className='min-h-screen'>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
    
  return (
    <div className="bg-[#EFF7FE] overflow-auto flex-grow convo p-3">
      <ul className="flex flex-col gap-4">
        {
          conversationMessages.map((message: MessageProp, index: number) => {                                    
            return (
              <MessageCard key={index} message={message} messages={conversationMessages} index={index} />
            )
          })
        }
      </ul>
    </div>
  )
}

export default ConversationBody