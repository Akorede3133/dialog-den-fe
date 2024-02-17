import ActiveUsers from "./ActiveUsers"
import ChatListHeader from "./ChatListHeader"

const ChatList = () => {
  return (
    <div className="w-[90%] mx-auto">
      <ChatListHeader />
      <ActiveUsers />
    </div>
  )
}

export default ChatList