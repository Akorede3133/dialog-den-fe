import ContactItems from "./ContactItems"
import ContactsHeader from "./ContactsHeader"

const ContactsList = () => {
  return (
    <div className="flex flex-col h-full">
      <ContactsHeader />
      <ContactItems />
    </div>
  )
}

export default ContactsList