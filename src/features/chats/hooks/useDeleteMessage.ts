import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteMessage from "../api/deleteMessage";

const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteMsg, isPending: isDeletingMsg } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['messages']});
      queryClient.invalidateQueries({queryKey: ['recentChats']})
    }
  })

  return { deleteMsg, isDeletingMsg }
}

export default useDeleteMessage