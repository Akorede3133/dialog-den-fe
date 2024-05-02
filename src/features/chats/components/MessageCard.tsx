import { useEffect, useRef } from "react";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import ImageMessage from "./ImageMessage";
import ReceiverImageCard from "./ReceiverImageCard";
import SenderImageCard from "./SenderImageCard";
import TextMessage from "./TextMessage";
import VoicePlayer from "./VoicePlayer";
import { useAppSelector } from "../../../redux/hooks";
import { selectChat } from "../redux/chatSlice";
import { HiOutlineEllipsisVertical, HiOutlineTrash } from "react-icons/hi2";
import ContextMenu from "../../../context/ContextMenu";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import useDeleteMessage from "../hooks/useDeleteMessage";

export type MessageProp = {
  id?: number;
  content: string;
  type: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  updatedAt?: string;
  status: string;
}

type MessageCardProp = {
  message: MessageProp;
  messages: MessageProp[];
  index: number;
}
const MessageCard = ({ message, messages, index }: MessageCardProp) => {
  const ref = useRef<HTMLLIElement>(null);
  const { user } = useCurrentUser();
  const { searchMatches, messageSearchText, currentSearchedMessageIndex } = useAppSelector(selectChat)

  const { content, senderId, id, status, createdAt } = message;
  const isSender = senderId === user?.id;
  const issenderImageCard = isSender && (!messages[index - 1 ] || messages[index - 1]?.receiverId == user?.id ) ;
  const isReceiverImageCard = !isSender && (!messages[index - 1 ] || messages[index - 1]?.senderId == user?.id );
  const { deleteMsg, isDeletingMsg } = useDeleteMessage();

  useEffect(() => {    
    const scrollToBottom = () => {
      ref.current?.scrollIntoView({ behavior: 'smooth'});
    };
    scrollToBottom();
  }, [messages]);
  useEffect(() => {    
    if (searchMatches.length) {
      const messagesId = searchMatches.map((msg) =>  msg.id);
      const text = Array.from(document.querySelectorAll('.letter'));  
      text.forEach((txt) => {
        txt.classList.remove('search--text');
      })  
    messages.forEach((msg) => {
      if (messagesId.includes(msg.id)) {
        const elem = document.querySelector(`[data-id='${msg.id}']`) as Element
        const text = Array.from(elem.querySelectorAll('.letter'));
        text.forEach((txt) => {
          const txtContent = txt.textContent?.toLowerCase();
          if (txtContent && txtContent.includes(messageSearchText.toLowerCase())) {
            txt.classList.add('search--text');
          }
        });
      }
    })  
    }
    
  }, [searchMatches, messages, messageSearchText])


  useEffect(() => {
    if (searchMatches.length) {
      const firstElem = document.querySelector(`[data-id='${searchMatches[currentSearchedMessageIndex].id}']`) as Element
      firstElem.scrollIntoView({ behavior: 'smooth'});
    }
  }, [currentSearchedMessageIndex, searchMatches])


  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      if (error instanceof Error)
      throw new Error(error.message)
    }
  }

  return (
    <li  ref={ref} key={id} data-id={id} className={`${isSender ? 'self-end' : 'self-start'} flex items-center gap-1 relative overflow-hi`}>
      <ContextMenu>
        <ContextMenu.Open type="message-context">
          <button className={` ${isSender ? 'order-1': 'order-2'} ${(isReceiverImageCard || issenderImageCard) && 'self-end mb-5'}`}>
            <HiOutlineEllipsisVertical />
          </button>
        </ContextMenu.Open>
        <ContextMenu.Window type="message-context">
          <ul className={`absolute ${isSender ? 'left-0' : 'right-0' } top-[-70px] bg-white shadow-lg rounded-md text-text-primary z-10 w-full  text-sm`}>
            <li className={`flex hover:bg-bg-silver items-center cursor-pointer gap-3 p-3 w-full ${message.type !== 'text' && 'hidden'}`}>
              <button className="w-full text-left pl-3" onClick={() => copyMessage(content)} >Copy</button>
            </li>
            <li className="flex hover:bg-bg-silver items-center cursor-pointer gap-3 p-3">
              <button className="w-full text-left pl-3"  onClick={() => deleteMsg(id as number)}>Delete</button>
            </li>
          </ul>
        </ContextMenu.Window>
      </ContextMenu>
     
      <div className={`flex flex-col ${isSender ? 'order-2' : 'order-1'}`}>
        { issenderImageCard && <SenderImageCard user={user} /> }
        { isReceiverImageCard && <ReceiverImageCard /> }
        { message.type === 'text' && <TextMessage isSender={isSender} content={content} createdAt={createdAt} status={status} /> }
        { message.type === 'image' && <ImageMessage content={content} isSender={isSender} status={status} /> }
        { message.type === 'voice' && <VoicePlayer content={content} isSender={isSender} status={status}  /> }
      </div>
    </li>
  )
}

export default MessageCard
