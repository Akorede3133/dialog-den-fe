import { HiOutlineChevronLeft, HiOutlineEllipsisHorizontal, HiOutlineMagnifyingGlass, HiOutlinePhone, HiOutlineTrash, HiOutlineUser, HiOutlineVideoCamera } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { callProp, displayCoversation, selectChat, setOutGoingVideoCall, setOutGoingVoiceCall, setReceiver, setShowOtherUserProfile, setVideoCall, setVoiceCall } from "../redux/chatSlice";
import ContextMenu from "../../../context/ContextMenu";
import { useEffect, useRef, useState } from "react";
const ConversationHeader = () => {
  const [search, setSearch] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const { receiver, onlineUsers, socket } = useAppSelector(selectChat);
  const isOnline = onlineUsers.includes(receiver?.id as number)
  const dispatch  = useAppDispatch();
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
  const showSearch = () => {
    setSearch(true);
  }

  useEffect(() => {
    const closeSearch = (e: MouseEvent) => {      
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearch(false);
      }
    }
    document.addEventListener('click', closeSearch, true);
    return () => {
      document.removeEventListener('click', closeSearch, true)
    }
  }, [])
  return (
    <div className="flex justify-between bg-white px-3 py-3 border-b relative w-full">
      { search &&  <form ref={searchRef} className="absolute rounded-lg bg-white z-10 p-2 left-[50%] top-[50px] w-[200px] max-w-[200px] shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        <input type="text" className=" bg-bg-silver p-2 w-full outline-none text-sm" placeholder="Search..." />
      </form> }
     <section className="flex items-center gap-2">
      <button className="sm:hidden" onClick={handleCloseConversation}>
        <HiOutlineChevronLeft />
      </button>
        <img src={receiver?.photo} alt="" className="w-[35px] h-[35px] rounded-full object-cover" />
        <p>{receiver?.username}</p>
        { isOnline && <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>}
     </section>

     <ul className="flex items-center px-3">
      <li className=" hidden md:block mr-10">
        <button onClick={showSearch}>
          <HiOutlineMagnifyingGlass className="text-xl" />
        </button>
        </li>
      <li className="mr-10">
        <button onClick={handleVoiceCall}>
          <HiOutlinePhone className="text-xl" />
        </button>
      </li>
      <li className="mr-10">
        <button onClick={handleVideoCall}>
          <HiOutlineVideoCamera className="text-xl" />
        </button>
      </li>
      <li className="hidden md:block mr-10">
        <button onClick={() => dispatch(setShowOtherUserProfile(true))}>
          <HiOutlineUser className="text-xl" />
        </button>
      </li>
      <ContextMenu>
        <ContextMenu.Open type="chat-header">
          <li className="">
            <button>
              <HiOutlineEllipsisHorizontal className="text-xl" />
            </button>
          </li>
        </ContextMenu.Open>
        <ContextMenu.Window type="chat-header">
          <ul className="absolute top-[70px] right-[10px] bg-white shadow-lg rounded-md text-text-primary z-10  text-sm">
            <li className="flex hover:bg-bg-silver items-center cursor-pointer gap-3 p-3 md:hidden" onClick={() => dispatch(setShowOtherUserProfile(true))}>
              <button className="w-full text-left pl-3" >View Profile</button>
              <HiOutlineUser className="text-xl" />
            </li>
            <li className="flex hover:bg-bg-silver items-center gap-3 p-3">
              <button className="w-full text-left pl-3">Delete</button>
              <HiOutlineTrash className="text-xl" />
            </li>
            <li className="flex hover:bg-bg-silver items-center gap-3 p-3" onClick={showSearch}>
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