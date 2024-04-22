import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendMessage, { DataProp } from "../api/sendMessage"

type MessageProp = {
  data: DataProp;
  receiverId: number;
}
const useSendMessage = () => {
  const { mutate: send, isPending: isSending, data: message} = useMutation({
    mutationFn: ({ data, receiverId }: MessageProp) => sendMessage(data, receiverId),
    // onSuccess: (messg) => 
  })

  return { send, isSending, message }
}

export default useSendMessage;