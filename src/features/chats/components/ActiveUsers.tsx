import { useEffect, useState } from "react"
import { useAppSelector } from "../../../redux/hooks"
import { selectChat } from "../redux/chatSlice"
import useGetUsers from "../../auth/hooks/useGetUsers"
import { UserProp } from "../../contacts/components/ContactCard"
import useCurrentUser from "../../auth/hooks/useCurrentUser"
import ActiveUsersList from "./ActiveUsersList"
import ActiveUsersSkeleton from "./ActiveUsersSkeleton"

const ActiveUsers = () => {
  const { onlineUsers: onlineUsersIds } = useAppSelector(selectChat)
  
  const [activeUsers, setActiveUsers] = useState<UserProp[]>([]);
  const [appUsers, setappUsers] = useState<UserProp[]>([]);
  const { user: currentUser, isGettingUser } = useCurrentUser();  
  const { users, isGettingUsers } = useGetUsers();


  useEffect(() => {
    if (users) {
      for (const key in users) {
        const onlineUsersPerCat = users[key];
        onlineUsersPerCat.forEach((user: UserProp) => {
          setappUsers((users) => ([...users, user]));
        })
      }
    }

  }, [users])


  useEffect(() => {
    const users = appUsers.filter((user) => onlineUsersIds.includes(user.id) && user.id !== currentUser?.id);
    setActiveUsers(users)
  }, [appUsers, onlineUsersIds, currentUser?.id])

  if (isGettingUsers && isGettingUser) {
    return (
      <div className="flex gap-4 py-5">
        {
          [1, 2, 3, 4, 5].map((item) => {
            return <ActiveUsersSkeleton key={item} />
          })
        }
      </div>
    )
  }
  if (activeUsers.length) {
    return (
      <ActiveUsersList activeUsers={activeUsers} />
    )
  }
  // if (!activeUsers.length) {
    return <p className="text-xl text-text-primary text-center py-2">No active users</p>
  // }
 
}

export default ActiveUsers