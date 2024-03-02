import { useQuery } from "@tanstack/react-query"
import { currentUser } from "../api/auth"

const useCurrentUser = () => {
  const { data: user, isPending: isGettingUser, error } = useQuery({
    queryFn:  currentUser,
    queryKey: ['user']
  });
  return { user, isGettingUser, error };
}

export default useCurrentUser;