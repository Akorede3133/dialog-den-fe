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
    onSuccess: () => {       
      queryClient.invalidateQueries({queryKey: ['messages', receiver.id] });
      queryClient.invalidateQueries({queryKey: ['recentChats']});
    }
  })

  return { send, isSending, message }
}

export default useSendMessage;