import { useContext } from "react";
import { HiOutlineChevronLeft, HiOutlineEllipsisHorizontal, HiOutlineMagnifyingGlass, HiOutlinePhone, HiOutlineUser, HiOutlineVideoCamera } from "react-icons/hi2"
import logo from '../../../assets/logo.png';
import { useAppSelector } from "../../../redux/hooks";
import { selectChat } from "../redux/chatSlice";
import { useSocketContext } from "../context/socketContext";
import CallWindow from "./CallWindow";
const ConversationHeader = () => {
  const { receiver } = useAppSelector(selectChat);
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(receiver?.id as number)
  
  return (
    <div className="flex justify-between bg-white px-3 border-b">
     <section className="flex items-center gap-2">
      <button className="sm:hidden">
        <HiOutlineChevronLeft />
      </button>
        <img src={logo} alt="" className="w-[35px] h-[35px] rounded-full" />
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
        <CallWindow>
          <CallWindow.Open callType='voice-call'>
            <button>
            <HiOutlinePhone className="text-xl" />
          </button>
        </CallWindow.Open>       
        </CallWindow>
       
      </li>
      <li>
        <CallWindow>
          <CallWindow.Open callType='video-call'>
            <button>
              <HiOutlineVideoCamera className="text-xl" />
          </button>
          </CallWindow.Open>
        </CallWindow>
        
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