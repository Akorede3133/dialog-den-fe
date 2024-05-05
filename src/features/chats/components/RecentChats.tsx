import { useEffect } from "react";
import useGetRecentChats from "../hooks/useGetRecentChats"
import RecentChatCard, { ChatProp } from "./RecentChatCard"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectChat, setNewMessagesState, setRecentChats } from "../redux/chatSlice";

const RecentChats = () => {
  const { chats, isGettingChats, error } = useGetRecentChats();    
  const { recentChats, socket } = useAppSelector(selectChat)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isGettingChats) {
      dispatch(setRecentChats(chats))
    }
  }, [chats, dispatch, isGettingChats])

  useEffect(() => {
    socket.on('recentChat', (newChat) => {      
      const obj = {...newChat};      
      const updatedChat = recentChats.filter((chat) => (chat.user.senderId !== newChat.user.senderId) && (chat.user.receiverId !== newChat.user.senderId));
      const targetChat = recentChats.find((chat) => (chat.user.senderId === newChat.user.senderId) || (chat.user.receiverId === newChat.user.senderId));
      obj.count = targetChat?.count as number + 1;
      dispatch(setRecentChats([obj, ...updatedChat]))
      dispatch(setNewMessagesState(true)); // Indicate that the receiving  user has new set of messages from another user.
    });
  }, [socket, recentChats, dispatch])
  
  if (isGettingChats) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div className="recent--chats h-full overflow-auto py-5">
      <ul className="space-y-5 px-5">
        {
          recentChats.map((chat: ChatProp, index) => (
            <RecentChatCard key={index} chat={chat} />
          ))
        }  
      </ul>
    </div>
  )
}

export default RecentChats