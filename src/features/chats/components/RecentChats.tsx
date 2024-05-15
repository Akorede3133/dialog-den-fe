import { useEffect } from "react";
import useGetRecentChats from "../hooks/useGetRecentChats"
import RecentChatCard, { ChatProp } from "./RecentChatCard"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectChat, setRecentChats } from "../redux/chatSlice";
import RecentChatLoading from "./RecentChatLoading";

const RecentChats = () => {
  const { chats, isGettingChats, error } = useGetRecentChats();    
  const { recentChats, socket, searchedRecentChats, searchedRecentChatsText } = useAppSelector(selectChat);  
  const dispatch = useAppDispatch();

  const isSearching = Boolean(searchedRecentChatsText)

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
    return (
      <div className="flex gap-4 flex-col px-5">
        {
          [1, 2, 3, 4, 5].map((item) => {      
            return <RecentChatLoading key={item} />
          })
        }
      </div>
      
    )
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (isSearching && !searchedRecentChats.length) {
    return (
      <div className="recent--chats h-full overflow-auto py-5">
        <p className=" text-center text-xl">No match was found</p>
      </div>
    )

  }
  if (isSearching && searchedRecentChats.length) {
    return (
      <div className="recent--chats h-full overflow-auto py-5">
        <ul className="space-y-5">
          {
            searchedRecentChats.map((chat: ChatProp, index) => (
              <RecentChatCard key={index} chat={chat} />
            ))
          }  
        </ul>
      </div>
    )
  }
  if (!isSearching && !recentChats.length) {
    return (
      <div className="flex justify-between items-center flex-col gap-2 mt-4">
        <p className="text-sm">No recent chat.</p>
        <p className="text-sm">Vist the users list to start a Conversation.</p>
      </div>
    )
  }

  return (
    <div className="recent--chats h-full overflow-auto py-5">
      <ul className="space-y-5">
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