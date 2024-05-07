import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import useGetMessages from '../hooks/useGetMessages';
import { selectChat, setConversationMessages, setNewMessagesState, setRecentChats } from '../redux/chatSlice';
import { useEffect } from 'react';
import MessageCard, { MessageProp } from './MessageCard';
import { useQueryClient } from '@tanstack/react-query';
import useGetRecentChats from '../hooks/useGetRecentChats';


const ConversationBody = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isGettingUser } = useCurrentUser();
  const { receiver, socket, conversationMessages, newMessages, recentChats } = useAppSelector(selectChat);
  const { messages, isPending, error } = useGetMessages(receiver?.id as number);
  const { chats } = useGetRecentChats();
      
  useEffect(() => {
    if (messages) {
      dispatch(setConversationMessages(messages))
    }
  }, [messages, dispatch])

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
  

  useEffect(() => {
    if(conversationMessages.length && newMessages) {
      queryClient.invalidateQueries({ queryKey: ['messages', receiver?.id] })            
      socket.emit('updateReadStatus', { receiverId: receiver?.id, messages: conversationMessages })
    }
  }, [conversationMessages, receiver?.id, socket, newMessages, queryClient])

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

  useEffect(() => {
    socket.on('updateReadStatus', ({ messages }) => {
      const updatedConvoMessages = [...messages].filter((message) => message.id).map((msg) => {
        if (msg.status !== 'read') {
          msg.status = 'read';
        }
        return msg;
      })
      dispatch(setConversationMessages(updatedConvoMessages))
      const chat = recentChats.map((chat) => {
        const chatCopy = { ...chat };
        if (chatCopy.user.receiverId === receiver?.id) {
          return { ...chatCopy, status: 'read' };
        }
        return chatCopy
      });
      dispatch(setRecentChats(chat))
      queryClient.invalidateQueries({queryKey: ['recentChats']})
      dispatch(setNewMessagesState(false));
    })
  }, [socket, dispatch, queryClient, receiver?.id, recentChats])
 
  
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