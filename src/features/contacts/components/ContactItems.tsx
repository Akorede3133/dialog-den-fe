import ContactCard from "./ContactCard"

const ContactItems = () => {
  return (
    <div className="h-[400px] sm:h-[600px] overflow-auto px-5">
      <ul className=" mt-6 space-y-8">
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </ul>
    </div>
  )
}

export default ContactItems