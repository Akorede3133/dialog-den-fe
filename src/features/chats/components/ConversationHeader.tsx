import { HiOutlineChevronLeft, HiOutlineEllipsisHorizontal, HiOutlineMagnifyingGlass, HiOutlinePhone, HiOutlineUser, HiOutlineVideoCamera } from "react-icons/hi2"
import logo from '../../../assets/logo.png';
const ConversationHeader = () => {
  return (
    <div className="flex justify-between bg-white px-3 border-b">
     <section className="flex items-center gap-2">
      <button className="sm:hidden">
        <HiOutlineChevronLeft />
      </button>
        <img src={logo} alt="" className="w-[35px] h-[35px] rounded-full" />
        <p>Patrick Hendricks</p>
        <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>
     </section>

     <ul className="flex items-center gap-10">
      <li>
        <button>
          <HiOutlineMagnifyingGlass className="text-xl" />
        </button>
      </li>
      <li>
        <button>
          <HiOutlinePhone className="text-xl" />
        </button>
      </li>
      <li>
         <button>
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