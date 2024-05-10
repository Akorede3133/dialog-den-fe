import { useEffect } from "react";
import useGetRecentChats from "../hooks/useGetRecentChats"
import RecentChatCard, { ChatProp } from "./RecentChatCard"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectChat, setHasUnreadMessagesState, setRecentChats } from "../redux/chatSlice";

const RecentChats = () => {
  const { chats, isGettingChats, error } = useGetRecentChats();    
  const { recentChats, socket, hasUnreadMessages } = useAppSelector(selectChat);  
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isGettingChats) {
      dispatch(setRecentChats(chats))
    }
  }, [chats, dispatch, isGettingChats])

  useEffect(() => {
    socket.on('recentChat', (newChat): void => { 
      dispatch(setRecentChats(newChat))      
    });
  }, [socket, dispatch])
  
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