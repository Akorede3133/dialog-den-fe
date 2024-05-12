import useGetUsers from "../../auth/hooks/useGetUsers"
import RecentChatLoading from "../../chats/components/RecentChatLoading";
import ContactCard, { UserProp } from "./ContactCard"

const ContactItems = () => {
  const { isGettingUsers, users, error} = useGetUsers();

  if (isGettingUsers) {
    return (
      <div className="flex gap-4 flex-col px-5">
        {
          [1, 2, 3, 4, 5].map((item) => {      
            return <RecentChatLoading key={item} />
          })
        }
      </div>
      
    )
  }
  if (error) {
    return <p>{error.message}</p>
  }
  
  
  return (
    <div className="h-full overflow-auto contacts px-5">
      <ul className=" mt-6 space-y-8">
      {Object.entries(users).map(([category, usersInCategory]) => (
          <ContactCard key={category} category={category} users={usersInCategory as UserProp[]} />
        ))}
      </ul>
    </div>
  )
}

export default ContactItems