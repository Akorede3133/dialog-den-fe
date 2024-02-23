import useGetUsers from "../../auth/hooks/useGetUsers"
import ContactCard, { UserProp } from "./ContactCard"

const ContactItems = () => {
  const { isGettingUsers, users, error} = useGetUsers();

  if (isGettingUsers) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  
  
  return (
    <div className="h-[450px] overflow-auto contacts px-5">
      <ul className=" mt-6 space-y-8">
      {Object.entries(users).map(([category, usersInCategory]) => (
          <ContactCard key={category} category={category} users={usersInCategory as UserProp[]} />
        ))}
      </ul>
    </div>
  )
}

export default ContactItems