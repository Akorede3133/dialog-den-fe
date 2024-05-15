import { HiOutlineArrowDown, HiOutlineArrowUp, HiOutlineChevronLeft, HiOutlineEllipsisHorizontal, HiOutlineMagnifyingGlass, HiOutlinePhone, HiOutlineTrash, HiOutlineUser, HiOutlineVideoCamera, HiOutlineXMark } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { callProp, displayCoversation, selectChat, setCurrentSearchedMessageIndex, setMessageSearchText, setOutGoingVideoCall, setOutGoingVoiceCall, setReceiver, setSearchMatches, setShowOtherUserProfile, setVideoCall, setVoiceCall } from "../redux/chatSlice";
import ContextMenu from "../../../context/ContextMenu";
import { FormEvent, useRef, useState } from "react";
import useDeleteConversation from "../hooks/useDeleteConversation";
const ConversationHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLFormElement>(null);
  const { receiver, onlineUsers, socket, conversationMessages, searchMatches, currentSearchedMessageIndex } = useAppSelector(selectChat);
  const isOnline = onlineUsers.includes(receiver?.id as number)
  const dispatch  = useAppDispatch();
  const { deleteConvo } = useDeleteConversation();
  const handleVoiceCall  = () => {
    dispatch(setVoiceCall(true));
    dispatch(setOutGoingVoiceCall(receiver as callProp))
    socket.emit('sendOutgoingCall', { callReceiverId: receiver?.id, type: 'voice'})
  }

  const handleVideoCall = () => {
    dispatch(setVideoCall(true));
    dispatch(setOutGoingVideoCall(receiver as callProp))
    socket.emit('sendOutgoingCall', { callReceiverId: receiver?.id, type: 'video'})
  }

  const handleCloseConversation = () => {
    dispatch(displayCoversation(false));
    dispatch(setReceiver(null));
  }

  const hideSearchForm = () => {
    setShowSearch(false);
    setSearchText('');
    dispatch(setSearchMatches([]))
    dispatch(setCurrentSearchedMessageIndex(0));
    const text = Array.from(document.querySelectorAll('.letter'));  
    text.forEach((txt) => {
      txt.classList.remove('search--text');
    })
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearchMatches([]))
    dispatch(setCurrentSearchedMessageIndex(0));
    const matches = conversationMessages.filter((msg) => msg.content.toLowerCase().includes(searchText.toLowerCase()));
    dispatch(setMessageSearchText(searchText))
    dispatch(setSearchMatches(matches))
  }
  const navigateSearchDownward = () => {
    if (searchMatches.length - 1 > currentSearchedMessageIndex) {
      dispatch(setCurrentSearchedMessageIndex(currentSearchedMessageIndex + 1));
    }
  }
  const navigateSearchUpward = () => {
    if (currentSearchedMessageIndex > 0) {
      dispatch(setCurrentSearchedMessageIndex(currentSearchedMessageIndex - 1));
    }

  }

  const disableDownButtonSearchedMessagesNavigator = searchMatches.length - 1 === currentSearchedMessageIndex;
  
  return (
    <div className="flex justify-between bg-white dark:bg-sender-bg-dark px-3 py-3 border-b dark:border-bg-dark relative w-full">
      { showSearch &&  <form onSubmit={handleSearch} ref={searchRef} className="absolute rounded-lg bg-white z-10 p-2 left-[50%] top-[20px] w-[200px] max-w-[200px] shadow-[0_0_10px_rgba(0,0,0,0.2)] flex  gap-3">
        <input type="text" className=" bg-bg-silver p-2 w-full outline-none text-sm"  autoFocus placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button type="button" className=" absolute right-0 top-0 px-1 py-1" onClick={hideSearchForm}>
          <HiOutlineXMark />
        </button>
        <section className="flex items-center mt-2 gap-2 ">
          <div className=" flex items-center gap-1">
            <button type="button" onClick={navigateSearchDownward} disabled={disableDownButtonSearchedMessagesNavigator}>
              <HiOutlineArrowDown className={`text-sm `}  />
            </button>
            { searchMatches.length ? <div className="text-[12px]">
              <span>{currentSearchedMessageIndex + 1}</span>
              <span>/</span>
              <span>{searchMatches.length}</span>

            </div> : null }
            <button type="button" onClick={navigateSearchUpward} disabled={currentSearchedMessageIndex === 0}>
              <HiOutlineArrowUp className="text-sm" />
            </button>
          </div>
        </section>
      </form> }
     <section className="flex items-center gap-2">
      <button className="sm:hidden" onClick={handleCloseConversation}>
        <HiOutlineChevronLeft />
      </button>
        <img src={receiver?.photo} alt="" className="w-[35px] h-[35px] rounded-full object-cover" />
        <p className=" dark:text-text-primary-dark">{receiver?.username}</p>
        { isOnline && <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>}
     </section>

     <ul className="flex items-center px-3">
      <li className=" hidden md:block mr-10">
        <button onClick={() => setShowSearch(true)}>
          <HiOutlineMagnifyingGlass className="text-xl dark:text-bg-silver" />
        </button>
        </li>
      <li className="mr-10">
        <button onClick={handleVoiceCall}>
          <HiOutlinePhone className="text-xl dark:text-bg-silver" />
        </button>
      </li>
      <li className="mr-10">
        <button onClick={handleVideoCall}>
          <HiOutlineVideoCamera className="text-xl dark:text-bg-silver" />
        </button>
      </li>
      <li className="hidden md:block mr-10">
        <button onClick={() => dispatch(setShowOtherUserProfile(true))}>
          <HiOutlineUser className="text-xl dark:text-bg-silver" />
        </button>
      </li>
      <ContextMenu>
        <ContextMenu.Open type="chat-header">
          <li className="">
            <button>
              <HiOutlineEllipsisHorizontal className="text-xl dark:text-bg-silver" />
            </button>
          </li>
        </ContextMenu.Open>
        <ContextMenu.Window type="chat-header">
          <ul className="absolute top-[70px] right-[10px] bg-white dark:bg-bg-dark shadow-lg rounded-md text-text-primary z-10 dark:text-text-primary-dark  text-sm">
            <li className="flex hover:bg-bg-silver dark:hover:bg-sidebar-dark items-center cursor-pointer gap-3 p-3 md:hidden" onClick={() => dispatch(setShowOtherUserProfile(true))}>
              <button className="w-full text-left pl-3" >View Profile</button>
              <HiOutlineUser className="text-xl" />
            </li>
            <li className="flex hover:bg-bg-silver dark:hover:bg-sidebar-dark items-center gap-3 p-3" onClick={() => deleteConvo(receiver?.id as number)}>
              <button className="w-full text-left pl-3">Delete</button>
              <HiOutlineTrash className="text-xl" />
            </li>
            <li className="flex hover:bg-bg-silver dark:hover:bg-sidebar-dark items-center gap-3 p-3" onClick={() => setShowSearch(true)}>
              <button className="w-full text-left pl-3">Search Messages</button>
                <HiOutlineMagnifyingGlass className="text-xl" />
            </li>
            </ul>
          </ContextMenu.Window>
        </ContextMenu>
     </ul>
    </div>
  )
}

export default ConversationHeader