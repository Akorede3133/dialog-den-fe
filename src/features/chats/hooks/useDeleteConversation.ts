import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteConversation from "../api/deleteConversation"
import { useNavigate } from "react-router-dom";

const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteConvo, isPending: isDeletingCovo } = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['messages']});
      queryClient.invalidateQueries({queryKey: ['recentChats']})
      navigate('/')
    }
  })

  return { deleteConvo, isDeletingCovo }
}

export default useDeleteConversation