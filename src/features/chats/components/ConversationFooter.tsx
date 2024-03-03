import { useState } from "react"
import SendTextMessage from "./SendTextMessage"
import SendVoiceMessage from "./SendVoiceMessage"

const ConversationFooter = () => {
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(true);
  return (
    <div  className="bg-white grid grid-cols-[1fr,auto] items-center gap-4 p-3">
      {
        showVoiceRecorder ? <SendVoiceMessage />
        : <SendTextMessage />
      }
    </div>
  )
}

export default ConversationFooter