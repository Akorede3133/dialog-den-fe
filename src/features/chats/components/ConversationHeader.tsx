import { HiOutlineChevronLeft, HiOutlineEllipsisHorizontal, HiOutlineMagnifyingGlass, HiOutlinePhone, HiOutlineTrash, HiOutlineUser, HiOutlineVideoCamera } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { callProp, displayCoversation, selectChat, setOutGoingVideoCall, setOutGoingVoiceCall, setShowOtherUserProfile, setVideoCall, setVoiceCall } from "../redux/chatSlice";
import ContextMenu from "../../../context/ContextMenu";
const ConversationHeader = () => {
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
  
  return (
    <div className="flex justify-between bg-white px-3 py-3 border-b relative">
     <section className="flex items-center gap-2">
      <button className="sm:hidden" onClick={() => dispatch(displayCoversation(false))}>
        <HiOutlineChevronLeft />
      </button>
        <img src={receiver?.photo} alt="" className="w-[35px] h-[35px] rounded-full object-cover" />
        <p>{receiver?.username}</p>
        { isOnline && <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>}
     </section>

     <ul className="flex items-center gap-10 px-3 w-[170px] md:w-[300px]">
      <li className=" hidden md:block">
        <button>
          <HiOutlineMagnifyingGlass className="text-xl" />
        </button>
      </li>
      <li>
        <button onClick={handleVoiceCall}>
          <HiOutlinePhone className="text-xl" />
        </button>
      </li>
      <li>
        <button onClick={handleVideoCall}>
          <HiOutlineVideoCamera className="text-xl" />
        </button>
      </li>
      <li className="hidden md:block">
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
            <li className="flex hover:bg-bg-silver items-center gap-3 p-3 md:hidden">
              <button className="w-full text-left pl-3" onClick={() => dispatch(setShowOtherUserProfile(true))}>View Profile</button>
              <HiOutlineUser className="text-xl" />
            </li>
            <li className="flex hover:bg-bg-silver items-center gap-3 p-3">
              <button className="w-full text-left pl-3">Delete</button>
              <HiOutlineTrash className="text-xl" />
            </li>
            <li className="flex hover:bg-bg-silver items-center gap-3 p-3">
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