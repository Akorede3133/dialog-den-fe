import { HiOutlineEmojiHappy } from "react-icons/hi"
import { HiOutlineMicrophone, HiOutlinePhoto, HiPaperAirplane } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { ReceiverProp, selectChat, setConversationMessages, setRecentChats } from "../redux/chatSlice"
import useSendMessage from "../hooks/useSendMessage"
import { useEffect, useRef, useState } from "react"
import useSendImage from "../hooks/useSendImage"
import { useQueryClient } from "@tanstack/react-query";
import Picker from "emoji-picker-react";
import useCurrentUser from "../../auth/hooks/useCurrentUser"
import { MessageProp } from "./MessageCard"
import { ChatProp, MessageReceiverProp, MessageSenderProp } from "./RecentChatCard"
import { UserProp } from "../../contacts/components/ContactCard"

type TextMessageProps = {
  showRecorder: () => void
}
const SendTextMessage = ({ showRecorder }: TextMessageProps) => {
  const dispatch = useAppDispatch();
  const [showEmoji, setShowEmoji] = useState(false);
  const { receiver, conversationMessages, recentChats, socket } = useAppSelector(selectChat);
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const emojiRef = useRef<HTMLDivElement>(null)
  const { send, isSending } = useSendMessage(user as UserProp, receiver as ReceiverProp);
  const { sendImageFile } = useSendImage();
  const [message, setMessage] = useState<string>('');
 
  const data: MessageProp = {
    content: message,
    type: 'text',
    senderId: user?.id as number,
    receiverId: receiver?.id as number,
    status: 'sending',
    createdAt: new Date().toISOString(),
  };


  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const blob = new Blob([file], { type: 'image/jpeg'});
    const url = URL.createObjectURL(blob);
    const imageData: MessageProp = {
      content: url,
      type: 'image',
      senderId: user?.id as number,
      receiverId: receiver?.id as number,
      status: 'sending',
      createdAt: new Date().toISOString(),
    };
    
    dispatch(setConversationMessages([...conversationMessages, imageData]));
       
    if (receiver) {
      sendImageFile({ file, receiverId: receiver?.id as number}, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['messages', receiver.id] });
          queryClient.invalidateQueries({queryKey: ['recentChats']});
        }
      });
    }
   
  }

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(setConversationMessages([...conversationMessages, data]));
    const chat = recentChats.find((chat) => (chat.user.receiverId || chat.user.senderId) === receiver?.id);
   
    const newChat: ChatProp = {
      content: message,
      type: 'text',
      status: 'sending',
      createdAt: new Date().toISOString(),
      user: {
        receiverId: receiver?.id as number,
        receiverEmail: receiver?.email as string,
        receiverPhoto: receiver?.photo as string,
        receiverUsername: receiver?.username as string,
      } as MessageReceiverProp & MessageSenderProp
    } 
    if (!chat) {
      dispatch(setRecentChats([newChat, ...recentChats]))
    } else {
      const updatedChats = recentChats.filter((convo) => convo.id !== chat.id)
      dispatch(setRecentChats([newChat, ...updatedChats]))
    }    
    if (receiver) {
      send({ data, receiverId: receiver?.id });
    }
    setMessage('')
  }


  const onEmojiClick = (emoji: { emoji: string }) => {    
    setMessage((prevMessage) => (
      `${prevMessage}${emoji.emoji}`
    ))    
  }

  useEffect(() => {
    const emojiEvent = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
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
    <div className="bg-white relative grid grid-cols-[1fr,auto] items-center gap-4 p-3 w-full">
      { showEmoji && <div ref={emojiRef} className=" absolute bottom-[100px] right-20">
        <Picker onEmojiClick={onEmojiClick} /> 
      </div> }
      <section className="">
        <textarea placeholder="Enter Message..."  className=" resize-none h-[50px] bg-bg-silver p-3 w-full rounded-md outline-none overflow-auto text-area" value={message} onChange={handleInput }   rows={1}/>
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