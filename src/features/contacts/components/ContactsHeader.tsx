import { ChangeEvent } from "react"
import PagesHeader from "../../../components/PagesHeader"
import PagesSearch from "../../../components/PagesSearch"
import { useAppDispatch } from "../../../redux/hooks"
import useGetUsers from "../../auth/hooks/useGetUsers"
import { setSearchedContacts, setSearchedContactsText } from "../../chats/redux/chatSlice"
import { UserProp } from "./ContactCard"

export type ContactsProps = {
  [key: string]: UserProp[]
}

const ContactsHeader = () => {
  const dispatch = useAppDispatch();
  const { users } = useGetUsers();
   
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch(setSearchedContactsText(text));
    if (users) {      
      const arrObj: [string, UserProp[]][] = Object.entries(users);
      const matchedContacts: ContactsProps = {}
      for(const [key, value] of arrObj) {
        value.forEach((val) => {
          if (val.username.toLowerCase().includes(text.toLowerCase())) { 
            if(!matchedContacts[key]) {
              matchedContacts[key] = [] 
            }
            matchedContacts[key].push(val)   
          }
        })
      }
      dispatch(setSearchedContacts(matchedContacts))
    }    
  }
  return (
    <div className="px-5">
      <PagesHeader text="Contacts" />
      <PagesSearch placeholder="Search users..."  search={handleSearch}/>
    </div>
  )
}

export default ContactsHeader