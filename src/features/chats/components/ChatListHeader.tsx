import { ChangeEvent } from "react";
import PagesHeader from "../../../components/PagesHeader"
import PagesSearch from "../../../components/PagesSearch"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectChat, setSearchedRecentChats, setSearchedRecentChatsText } from "../redux/chatSlice";
import ActiveUsers from "./ActiveUsers"
const ChatListHeader = () => {
  const {  recentChats } = useAppSelector(selectChat);
  const dispatch = useAppDispatch();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch(setSearchedRecentChatsText(text))
      const matches = [...recentChats].filter((chat) => {
        const name = chat.user.receiverUsername || chat.user.senderUsername;
        const message = chat.content;
    
        if (message.toLowerCase().includes(text.toLowerCase()) || name.toLowerCase().includes(text.toLowerCase())) {
          return chat;
        }
      })
      dispatch(setSearchedRecentChats(matches))    
  }
  return (
    <div className="px-5">
      <PagesHeader text="Chats" />
      <PagesSearch placeholder="Search messages or users" search={handleSearch} />
      <ActiveUsers />
      <h2 className=" font-roboto-condensed text-text-primary dark:text-text-primary-dark font-medium text-sm">Recent</h2>
    </div>
  )
}

export default ChatListHeader