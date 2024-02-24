import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendMessage, { DataProp } from "../api/sendMessage"

type MessageProp = {
  data: DataProp;
  receiverId: number;
}
const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { mutate: send, isPending: isSending} = useMutation({
    mutationFn: ({ data, receiverId }: MessageProp) => sendMessage(data, receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages']})
    }
  })

  return { send, isSending }
}

export default useSendMessage;