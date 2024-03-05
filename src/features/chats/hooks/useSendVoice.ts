import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendVoice from "../api/sendVoice";

const useSendVoice = () => {
  const queryClient = useQueryClient();
  const { mutate: sendVoiceFile, isPending: isSendingVoice, error} = useMutation({
    mutationFn: ({ file, receiverId }) => sendVoice(file, receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['messages'] });
    }
  })

  return { sendVoiceFile, isSendingVoice, error };
}

export default useSendVoice;