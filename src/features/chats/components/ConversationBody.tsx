import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat, setConversationMessages, setRecentChats } from '../redux/chatSlice';
import { useEffect } from 'react';
import MessageCard, { MessageProp } from './MessageCard';
import { useQueryClient } from '@tanstack/react-query';
import useGetRecentChats from '../hooks/useGetRecentChats';


const ConversationBody = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isGettingUser } = useCurrentUser();
  const { receiver, socket, conversationMessages } = useAppSelector(selectChat);
  const { messages, isPending, error } = useGetMessages(receiver?.id as number);
  const { chats } = useGetRecentChats();

  useEffect(() => {
    if (messages) {
      dispatch(setConversationMessages(messages))
    }
  }, [messages, dispatch])

  useEffect(() => {
    socket.on('readMessage', (messageIds) => {
      queryClient.invalidateQueries({ queryKey: ['messages', receiver?.id] })
      const updatedMessages = conversationMessages.map(message => (
        messageIds.includes(message.id) ? { ...message, status: 'read' } : message
      ));
      dispatch(setConversationMessages(updatedMessages));

    });
    socket.on('getMessage', (message) => {
      dispatch(setConversationMessages([...conversationMessages, message]))
      queryClient.invalidateQueries({ queryKey: ['messages', receiver?.id] })
    });
  }, [socket, conversationMessages, dispatch, receiver?.id, queryClient])

  useEffect(() => {
    if (chats) {
      const updatedRecentChat = chats.map((chat) => {
        const newChat = { ...chat };
    
        if (newChat.user.senderId === receiver?.id) {
          return { ...newChat, count: 0 };
        }
        return newChat;
      });    
      dispatch(setRecentChats(updatedRecentChat));
    }
  }, [dispatch, chats, receiver?.id]);
  
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