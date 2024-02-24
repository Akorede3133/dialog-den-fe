import { HiOutlineEmojiHappy } from "react-icons/hi"
import { HiOutlineMicrophone, HiOutlinePhoto, HiPaperAirplane } from "react-icons/hi2"
import { useAppSelector } from "../../../redux/hooks"
import { selectChat } from "../redux/chatSlice"
import useSendMessage from "../hooks/useSendMessage"
import { useState } from "react"

const ConversationFooter = () => {
  const { receiver } = useAppSelector(selectChat);
  const { send, isSending } = useSendMessage();
  const [message, setMessage] = useState<string>('');
  console.log(receiver);
  const data = {
    content: message,
    type: 'text'
  };

  const handleSend = () => {
    if (receiver) {
      send({ data, receiverId: receiver?.id });
      setMessage('');
    }
  }
  

  return (
    <div className="bg-white grid grid-cols-[1fr,auto] items-center gap-4 p-3">
      <section className="">
        <input type="text" placeholder="Enter Message..."  className=" bg-bg-silver p-3 w-full rounded-md outline-none" value={message} onChange={(e) => setMessage(e.target.value) }/>
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
        <button className=" bg-message-bg-blue rounded-full h-[40px] w-[40px] flex justify-center items-center" onClick={handleSend} disabled={isSending}>
          <HiPaperAirplane className=" text-white text-2xl" />
        </button>
      </section>
    </div>
  )
}

export default ConversationFooter