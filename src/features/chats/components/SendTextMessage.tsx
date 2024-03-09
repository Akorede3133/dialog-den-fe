import { HiOutlineEmojiHappy } from "react-icons/hi"
import { HiOutlineMicrophone, HiOutlinePhoto, HiPaperAirplane } from "react-icons/hi2"
import { useAppSelector } from "../../../redux/hooks"
import { selectChat } from "../redux/chatSlice"
import useSendMessage from "../hooks/useSendMessage"
import { useEffect, useRef, useState } from "react"
import useSendImage from "../hooks/useSendImage"
import { useQueryClient } from "@tanstack/react-query";
import Picker from "emoji-picker-react";

type TextMessageProps = {
  showRecorder: () => void
}
const SendTextMessage = ({ showRecorder }: TextMessageProps) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const { receiver } = useAppSelector(selectChat);
  const queryClient = useQueryClient();
  const emojiRef = useRef<HTMLDivElement>(null)
  const { send, isSending } = useSendMessage();
  const { sendImageFile, isSendingImage, error } = useSendImage();
  const [message, setMessage] = useState<string>('');
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    sendImageFile({ file, receiverId: receiver?.id as number});
  }
  const data = {
    content: message,
    type: 'text'
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
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

  const onEmojiClick = (emoji, e) => {
    setMessage((prevMessage) => (
      `${prevMessage}${emoji.emoji}`
    ))    
  }

  useEffect(() => {
    const emojiEvent = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        console.log('event');
        setShowEmoji(false);
      }
    }
    document.addEventListener('click', emojiEvent, true)
    return () => {
      document.addEventListener('click', emojiEvent, true);
    }
  }, [])

  const handleEmoji = () => {
    setShowEmoji((prev) => !prev)
  }
  return (
    <div className="bg-white relative grid grid-cols-[1fr,auto] items-center gap-4 p-3">
      { showEmoji && <div ref={emojiRef} className=" absolute bottom-[100px] right-20">
        <Picker onEmojiClick={onEmojiClick} /> 
      </div> }
      <section className="">
        <textarea placeholder="Enter Message..."  className=" resize-none h-[50px] bg-bg-silver p-3 w-full rounded-md outline-none overflow-hidden" value={message} onChange={handleInput } onKeyDown={ adjustTextArea}  rows={1}/>
      </section>
      <section className="flex gap-5 items-center">
        <button onClick={handleEmoji}>
          <HiOutlineEmojiHappy className=" text-message-bg-blue" />
        </button>
        <label htmlFor="image" className=" cursor-pointer">
          <HiOutlinePhoto className=" text-message-bg-blue" />
          <input type="file" name="image" id="image" hidden accept="image/png, image/jpeg" onChange={handleImageUpload} />
        </label>
        <button onClick={showRecorder}>
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