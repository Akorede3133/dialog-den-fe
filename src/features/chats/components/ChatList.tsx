import ActiveUsers from "./ActiveUsers"
import ChatListHeader from "./ChatListHeader"
import RecentChats from "./RecentChats"

const ChatList = () => {
  return (
    <div className="">
      <ChatListHeader />
      <RecentChats />
    </div>
  )
}

export default ChatList