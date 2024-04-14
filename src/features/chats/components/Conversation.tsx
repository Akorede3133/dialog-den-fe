import ConversationBody from "./ConversationBody"
import ConversationFooter from "./ConversationFooter"
import ConversationHeader from "./ConversationHeader"

const Conversation = () => {
  return (
    <div className="h-full flex flex-col">
      <ConversationHeader />
      <ConversationBody />
      <ConversationFooter />
    </div>
  )
}

export default Conversation