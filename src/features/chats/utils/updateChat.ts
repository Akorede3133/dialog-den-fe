import { AppDispatch } from "../../../redux/store";
import { MessageProp } from "../components/MessageCard";
import { ChatProp, MessageReceiverProp, MessageSenderProp } from "../components/RecentChatCard";
import { ReceiverProp, setRecentChats } from "../redux/chatSlice";
type chatObjProp = {
  recentChats: ChatProp[];
  receiver: ReceiverProp | null;
  message: { type: string, content: string };
  dispatch: AppDispatch;
}

const updateChat = (chatObj: chatObjProp) => {
  const { recentChats, receiver, message, dispatch } = chatObj;

  const chat = recentChats.find((chat) => (chat.user.receiverId || chat.user.senderId) === receiver?.id);
   
  const newChat: ChatProp = {
    content: message.content,
    type: message.type,
    status: 'sending',
    count: 0,
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
    const updatedChats = recentChats.filter((convo: ChatProp) => convo.id !== chat.id)
    dispatch(setRecentChats([newChat, ...updatedChats]))
  }  
}
export default updateChat;