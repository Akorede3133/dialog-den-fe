import { HiOutlineChevronLeft, HiOutlineEllipsisHorizontal, HiOutlineMagnifyingGlass, HiOutlinePhone, HiOutlineUser, HiOutlineVideoCamera } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { callProp, displayCoversation, selectChat, setOutGoingVideoCall, setOutGoingVoiceCall, setVideoCall, setVoiceCall } from "../redux/chatSlice";
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
    <div className="flex justify-between bg-white px-3 py-3 border-b">
     <section className="flex items-center gap-2">
      <button className="sm:hidden" onClick={() => dispatch(displayCoversation(false))}>
        <HiOutlineChevronLeft />
      </button>
        <img src={receiver?.photo} alt="" className="w-[35px] h-[35px] rounded-full object-cover" />
        <p>{receiver?.username}</p>
        { isOnline && <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>}
     </section>

     <ul className="flex items-center gap-10">
      <li>
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
      <li>
        <button>
          <HiOutlineUser className="text-xl" />
        </button>
      </li>
      <li>
        <button>
          <HiOutlineEllipsisHorizontal className="text-xl" />
        </button>
      </li>
     </ul>

    </div>
  )
}

export default ConversationHeader