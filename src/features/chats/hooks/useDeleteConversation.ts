import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteConversation from "../api/deleteConversation"

const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteConvo, isPending: isDeletingCovo } = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['messages']});
      queryClient.invalidateQueries({queryKey: ['recentChats']})
    }
  })

  return { deleteConvo, isDeletingCovo }
}

export default useDeleteConversation