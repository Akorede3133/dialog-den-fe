import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/updateProfile"

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUserProfile, isPending: isUpdatingProfile, error } = useMutation({
    mutationFn: ({ userId, data }: { userId: number, data: { username: string, photo: File, password: string, passwordConfirmation: string } }) => updateProfile(userId, data),
    onSuccess: () => {
      console.log('Succces');
      queryClient.invalidateQueries({ queryKey: ['user'] })
      
    },
    onError: (error) =>  {
      console.log(error);
    },
  })
  return { updateUserProfile, isUpdatingProfile, error }
}

export default useUpdateProfile;