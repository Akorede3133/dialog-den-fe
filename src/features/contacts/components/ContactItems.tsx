import { useAppSelector } from "../../../redux/hooks";
import useGetUsers from "../../auth/hooks/useGetUsers"
import RecentChatLoading from "../../chats/components/RecentChatLoading";
import { selectChat } from "../../chats/redux/chatSlice";
import ContactCard, { UserProp } from "./ContactCard"
import { ContactsProps } from "./ContactsHeader";

const ContactItems = () => {
  const { isGettingUsers, users, error} = useGetUsers();
  const { searchedContacts, searchedContactsText } = useAppSelector(selectChat)
  const isSearching = Boolean(searchedContactsText);
  let isSearchedContactsNotEmpty = false;


  if (searchedContacts) {
    isSearchedContactsNotEmpty = Boolean(Object.keys(searchedContacts as ContactsProps).length);  
  }

  
  
  

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

  if (isSearching && searchedContacts && isSearchedContactsNotEmpty) {
    return (
      <div className="h-full overflow-auto contacts px-5">
      <ul className=" mt-6 space-y-8">
      {Object.entries(searchedContacts).map(([category, usersInCategory]) => (
          <ContactCard key={category} category={category} users={usersInCategory as UserProp[]} />
        ))}
      </ul>
    </div>
    )
  }

  if (isSearching && !isSearchedContactsNotEmpty) {    
    return (
      <div className="px-5">
        <p className="text-xl text-center">No match found</p>
      </div>
    )
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