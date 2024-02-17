import PagesHeader from "../../../components/PagesHeader"
import PagesSearch from "../../../components/PagesSearch"
import ActiveUsers from "./ActiveUsers"
import ChatSearch from "./ChatSearch"

const ChatListHeader = () => {
  return (
    <div className="px-5">
      <PagesHeader text="Chat" />
      <PagesSearch placeholder="Search messages or users" />
      <ActiveUsers />
      <h2 className=" bg-inherit">Recents</h2>
    </div>
  )
}

export default ChatListHeader