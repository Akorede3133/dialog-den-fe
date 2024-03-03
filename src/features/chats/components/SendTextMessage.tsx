import { HiOutlineEmojiHappy } from "react-icons/hi"
import { HiOutlineMicrophone, HiOutlinePhoto, HiPaperAirplane } from "react-icons/hi2"
import { useAppSelector } from "../../../redux/hooks"
import { selectChat } from "../redux/chatSlice"
import useSendMessage from "../hooks/useSendMessage"
import { useState } from "react"
import useSendImage from "../hooks/useSendImage"
import { useQueryClient } from "@tanstack/react-query"

const SendTextMessage = () => {
  const { receiver } = useAppSelector(selectChat);
  const queryClient = useQueryClient();

  const { send, isSending } = useSendMessage();
  const { sendImageFile, isSendingImage, error } = useSendImage();
  const [message, setMessage] = useState<string>('');
  const [image, setImage]  = useState(null)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file, receiver);
    sendImageFile({ file, receiverId: receiver?.id});
  }
  const data = {
    content: message,
    type: 'text'
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // adjustTextArea(e.target)
  }

  const handleSend = () => {
    if (receiver) {
      send({ data, receiverId: receiver?.id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['messages', receiver.id] });
        }
      });
      setMessage('');
    }
  }

  const adjustTextArea = (e) => {
    const { target } = e;
    const scrollHeight = target.scrollHeight;
    target.style.height = 'auto';
    target.style.height = `${scrollHeight}px`;
  }
  return (
    <div className="bg-white grid grid-cols-[1fr,auto] items-center gap-4 p-3">
      <section className="">
        <textarea placeholder="Enter Message..."  className=" resize-none h-[50px] bg-bg-silver p-3 w-full rounded-md outline-none overflow-hidden" value={message} onChange={handleInput } onKeyDown={ adjustTextArea}  rows={1}/>
      </section>
      <section className="flex gap-5 items-center">
        <button>
          <HiOutlineEmojiHappy className=" text-message-bg-blue" />
        </button>
        <label htmlFor="image" className=" cursor-pointer">
          <HiOutlinePhoto className=" text-message-bg-blue" />
          <input type="file" name="image" id="image" hidden accept="image/png, image/jpeg" onChange={handleImageUpload} />
        </label>
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

export default SendTextMessage