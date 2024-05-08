import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendImage from "../api/sendImage"
import { UserProp } from "../../contacts/components/ContactCard";
import { ReceiverProp, selectChat } from "../redux/chatSlice";
import { ChatProp, MessageReceiverProp, MessageSenderProp } from "../components/RecentChatCard";
import { useAppSelector } from "../../../redux/hooks";

const useSendImage = (user: UserProp, receiver: ReceiverProp) => {
  const queryClient = useQueryClient();
  const { socket } = useAppSelector(selectChat)
  const { mutate: sendImageFile, isPending: isSendingImage, error} = useMutation({
    mutationFn: ({ file, receiverId }: { file: File, receiverId: number }) => sendImage(file, receiverId),
    onSuccess: (msg) => {
      queryClient.invalidateQueries();
      const newChat: ChatProp = {
        content: msg.content,
        count: 0,
        type: 'image',
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

  return { sendImageFile, isSendingImage, error };
}

export default useSendImage;