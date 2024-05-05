import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendMessage, { DataProp } from "../api/sendMessage"
import { useAppSelector } from "../../../redux/hooks";
import { ReceiverProp, selectChat } from "../redux/chatSlice";
import { ChatProp, MessageReceiverProp, MessageSenderProp } from "../components/RecentChatCard";
import { UserProp } from "../../contacts/components/ContactCard";

type MessageProp = {
  data: DataProp;
  receiverId: number;
}
const useSendMessage = (user: UserProp, receiver: ReceiverProp) => {
  const queryClient = useQueryClient();
  const { socket } = useAppSelector(selectChat)
  const { mutate: send, isPending: isSending, data: message} = useMutation({
    mutationFn: ({ data, receiverId }: MessageProp) => sendMessage(data, receiverId),
    onSuccess: (msg) => {
      const newChat: ChatProp = {
        content: msg.content,
        count: 0,
        type: 'text',
        status: 'sent',
        createdAt: new Date().toISOString(),
        user: {
          senderId: user?.id as number,
          senderEmail: user?.email as string,
          senderPhoto: user?.photo as string,
          senderUsername: user?.username as string,
        } as MessageReceiverProp & MessageSenderProp
      }       
      socket.emit('recentChat', { newChat, receiverId: receiver.id } );
      queryClient.invalidateQueries({queryKey: ['messages', receiver.id] });
      queryClient.invalidateQueries({queryKey: ['recentChats']});
    }
  })

  return { send, isSending, message }
}

export default useSendMessage;