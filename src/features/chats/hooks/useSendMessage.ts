import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendMessage, { DataProp } from "../api/sendMessage"
import { useAppSelector } from "../../../redux/hooks";
import { selectChat } from "../redux/chatSlice";

type MessageProp = {
  data: DataProp;
  receiverId: number;
}
const useSendMessage = () => {
  const queryClient = useQueryClient();
  useAppSelector(selectChat)
  const { mutate: send, isPending: isSending, data: message} = useMutation({
    mutationFn: ({ data, receiverId }: MessageProp) => sendMessage(data, receiverId),
    onSuccess: () => {       
      queryClient.invalidateQueries({queryKey: ['messages'] });
      queryClient.invalidateQueries({queryKey: ['recentChats']});
    }
  })

  return { send, isSending, message }
}

export default useSendMessage;