import { useMutation } from "@tanstack/react-query"
import sendMessage, { DataProp } from "../api/sendMessage"

type MessageProp = {
  data: DataProp;
  receiverId: number;
}
const useSendMessage = () => {
  const { mutate: send, isPending: isSending} = useMutation({
    mutationFn: ({ data, receiverId }: MessageProp) => sendMessage(data, receiverId),
    onSuccess: () => {
      
    }
  })

  return { send, isSending }
}

export default useSendMessage;