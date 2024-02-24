import { useQuery } from "@tanstack/react-query"
import getMessages from "../api/getMessages"

const useGetMessages = (id: number) => {
  const { data: messages, isPending, error} = useQuery({
    queryFn: () => getMessages(id),
    queryKey: ['messages', id]
  })

  return { messages, isPending, error };
}

export default useGetMessages