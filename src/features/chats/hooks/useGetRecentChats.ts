import { useQuery } from "@tanstack/react-query"
import getRecentChats from "../api/getRecentChats"
import { ChatProp } from "../components/RecentChatCard"

type UseGetRecentChatsProp = {
  chats: ChatProp[];
  isGettingChats: boolean;
  error: Error | null
}
const useGetRecentChats = (): UseGetRecentChatsProp  => {
  const { data: chats, isPending:isGettingChats, error } = useQuery({
    queryFn: getRecentChats,
    queryKey: ['recentChats']
  })

  return { chats, isGettingChats, error };
}

export default useGetRecentChats