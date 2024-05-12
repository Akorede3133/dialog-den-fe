import PagesHeader from "../../../components/PagesHeader"
import PagesSearch from "../../../components/PagesSearch"

const ContactsHeader = () => {
  return (
    <div className="px-5">
      <PagesHeader text="Contacts" />
      <PagesSearch placeholder="Search users..." />
    </div>
  )
}

export default ContactsHeader