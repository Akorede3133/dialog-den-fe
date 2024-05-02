import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import deleteMessage from "../api/deleteMessage";

const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteMsg, isPending: isDeletingMsg } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['messages']});
      queryClient.invalidateQueries({queryKey: ['recentChats']})
      navigate('/')
    }
  })

  return { deleteMsg, isDeletingMsg }
}

export default useDeleteMessage