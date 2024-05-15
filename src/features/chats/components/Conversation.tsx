import ConversationBody from "./ConversationBody"
import ConversationFooter from "./ConversationFooter"
import ConversationHeader from "./ConversationHeader"

const Conversation = () => {
  return (
    <div className="h-full absolute top-0 right-0 sm:static order-3 flex flex-col w-full z-10">
      <ConversationHeader />
      <ConversationBody />
      <ConversationFooter />
    </div>
  )
}

export default Conversation