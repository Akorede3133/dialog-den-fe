import { useQuery } from "@tanstack/react-query"
import getRecentChats from "../api/getRecentChats"

const useGetRecentChats = () => {
  const { data: chats, isPending:isGettingChats, error } = useQuery({
    queryFn: getRecentChats,
    queryKey: ['recentChats']
  })

  return { chats, isGettingChats, error };
}

export default useGetRecentChats