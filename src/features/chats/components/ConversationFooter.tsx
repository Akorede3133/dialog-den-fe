import { HiOutlineEmojiHappy } from "react-icons/hi"
import { HiOutlineMicrophone, HiOutlinePaperAirplane, HiOutlinePhoto, HiPaperAirplane } from "react-icons/hi2"

const ConversationFooter = () => {
  return (
    <div className="bg-white grid grid-cols-[1fr,auto] items-center gap-4 p-3">
      <section className="">
        <input type="text" placeholder="Enter Message..."  className=" bg-bg-silver p-3 w-full rounded-md outline-none"/>
      </section>
      <section className="flex gap-5 items-center">
        <button>
          <HiOutlineEmojiHappy className=" text-message-bg-blue" />
        </button>
        <button>
          <HiOutlinePhoto className=" text-message-bg-blue" />
        </button>
        <button>
          <HiOutlineMicrophone className=" text-message-bg-blue" />
        </button>
        <button className=" bg-message-bg-blue rounded-full h-[40px] w-[40px] flex justify-center items-center">
          <HiPaperAirplane className=" text-white text-2xl" />
        </button>
      </section>
    </div>
  )
}

export default ConversationFooter