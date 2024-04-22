import ChatListHeader from "./ChatListHeader"
import RecentChats from "./RecentChats"

const ChatList = () => {
  return (
    <div className="h-full flex flex-col">
      <ChatListHeader />
      <RecentChats />
    </div>
  )
}

export default ChatList