import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendImage from "../api/sendImage"
import { selectChat } from "../redux/chatSlice";
import { useAppSelector } from "../../../redux/hooks";

const useSendImage = () => {
  const queryClient = useQueryClient();
  useAppSelector(selectChat)
  const { mutate: sendImageFile, isPending: isSendingImage, error} = useMutation({
    mutationFn: ({ file, receiverId }: { file: File, receiverId: number }) => sendImage(file, receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['messages'] });
      queryClient.invalidateQueries({queryKey: ['recentChats']});
    }
  })

  return { sendImageFile, isSendingImage, error };
}

export default useSendImage;