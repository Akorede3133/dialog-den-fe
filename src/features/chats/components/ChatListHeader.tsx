import PagesHeader from "../../../components/PagesHeader"
import ChatSearch from "./ChatSearch"

const ChatListHeader = () => {
  return (
    <div>
      <PagesHeader text="Chat" />
      <ChatSearch />
    </div>
  )
}

export default ChatListHeader