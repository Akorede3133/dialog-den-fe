import { useEffect, useRef } from "react";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import ImageMessage from "./ImageMessage";
import ReceiverImageCard from "./ReceiverImageCard";
import SenderImageCard from "./SenderImageCard";
import TextMessage from "./TextMessage";
import VoicePlayer from "./VoicePlayer";
import { useAppSelector } from "../../../redux/hooks";
import { selectChat } from "../redux/chatSlice";

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

  useEffect(() => {    
    const scrollToBottom = () => {
      ref.current?.scrollIntoView({ behavior: 'smooth'});
    };
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (searchMatches.length) {
      const messagesId = searchMatches.map((msg) =>  msg.id);    
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
        


  return (
    <li  ref={ref} key={id} data-id={id} className={`${isSender ? 'self-end' : 'self-start'} flex flex-col max-w-[60%]`}>
      { issenderImageCard && <SenderImageCard user={user} /> }
      { isReceiverImageCard && <ReceiverImageCard /> }
      { message.type === 'text' && <TextMessage isSender={isSender} content={content} createdAt={createdAt} status={status} /> }
      { message.type === 'image' && <ImageMessage content={content} isSender={isSender} status={status} /> }
      { message.type === 'voice' && <VoicePlayer content={content} isSender={isSender} status={status}  /> }
    </li>
  )
}

export default MessageCard
