import useGetRecentChats from "../hooks/useGetRecentChats"
import RecentChatCard, { ChatProp } from "./RecentChatCard"

const RecentChats = () => {
  const { chats, isGettingChats, error } = useGetRecentChats();

  if (isGettingChats) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <div className=" recent--chats overflow-auto max-h-[350px] py-5">
      <ul className="space-y-5 px-5">
        {
          chats.map((chat: ChatProp) => (
            <RecentChatCard key={chat.id} chat={chat} />
          ))
        }
      </ul>
    </div>
  )
}

export default RecentChats