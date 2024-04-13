import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "../api/updateProfile"

const useUpdateProfile = () => {
  const { data, isPending: isUpdatingProfile, error } = useMutation({
    mutationFn: ({ userId, data }) => updateProfile(userId, data),
    onSuccess: () => {
      console.log('Succces');
      
    },
    onError: (error) =>  {
      console.log(error);
    },
  })
  return { data, isUpdatingProfile, error }
}

export default useUpdateProfile;