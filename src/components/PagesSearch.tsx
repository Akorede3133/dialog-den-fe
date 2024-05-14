import { ChangeEvent, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectChat, setRecentChats, setSearchedRecentChats, setSearchedRecentChatsText } from "../features/chats/redux/chatSlice";
import { ChatProp } from "../features/chats/components/RecentChatCard";
type PageSearchProp = {
  placeholder: string;
}
const PagesSearch = ( { placeholder }: PageSearchProp) => {
  // const [text, setText] = useState('');
  const {  recentChats } = useAppSelector(selectChat);
  // const [searchMatches, setSearchMatches] = useState<ChatProp[]>([]);
  const dispatch = useAppDispatch();

  // console.log(recentChats);
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
    <div className=" bg-bg-silver flex items-center gap-8 px-4 py-3 rounded-sm mb-5">
      <HiOutlineMagnifyingGlass className="text-[18px] text-text-gray" />
      <input type="text" className="bg-inherit text-sm outline-none focus:outline-none w-full" placeholder={placeholder} onChange={handleSearch} />
    </div>
  )
}

export default PagesSearch