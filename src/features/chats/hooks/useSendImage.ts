import { useMutation, useQueryClient } from "@tanstack/react-query"
import sendImage from "../api/sendImage"

const useSendImage = () => {
  const queryClient = useQueryClient();
  const { mutate: sendImageFile, isPending: isSendingImage, error} = useMutation({
    mutationFn: ({ file, receiverId }: { file: File, receiverId: number }) => sendImage(file, receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  return { sendImageFile, isSendingImage, error };
}

export default useSendImage;