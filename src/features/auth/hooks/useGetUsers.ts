import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers";

const useGetUsers = () => {
  const { data: users, isPending: isGettingUsers, error } = useQuery({
    queryFn: () => getUsers(),
    queryKey: ['users']
  });
  return { users, isGettingUsers, error };
}

export default useGetUsers