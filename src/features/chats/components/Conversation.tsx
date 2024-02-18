import ConversationBody from "./ConversationBody"
import ConversationFooter from "./ConversationFooter"
import ConversationHeader from "./ConversationHeader"

const Conversation = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,400px,auto]">
      <ConversationHeader />
      <ConversationBody />
      <ConversationFooter />
    </div>
  )
}

export default Conversation