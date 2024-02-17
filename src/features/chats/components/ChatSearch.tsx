import { HiOutlineMagnifyingGlass } from "react-icons/hi2"

const ChatSearch = () => {
  return (
    <div className=" bg-bg-silver flex items-center gap-3 px-4 py-3 rounded-sm">
      <HiOutlineMagnifyingGlass className="text-[18px] text-text-gray" />
      <input type="text" className="bg-inherit text-sm outline-none focus:outline-none" placeholder="Search messages or users" />
    </div>
  )
}

export default ChatSearch