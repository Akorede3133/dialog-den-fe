import { useState } from "react"
import SendTextMessage from "./SendTextMessage"
import SendVoiceMessage from "./SendVoiceMessage"

const ConversationFooter = () => {
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const handleShowRecorder = () => {
    setShowVoiceRecorder(true);
  }
  return (
    <div  className="bg-white grid grid-cols-[1fr,auto] items-center gap-4 p-3">
      {
        showVoiceRecorder ? <SendVoiceMessage />
        : <SendTextMessage showRecorder={handleShowRecorder} />
      }
    </div>
  )
}

export default ConversationFooter