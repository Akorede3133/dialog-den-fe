import { useState } from "react"
import SendTextMessage from "./SendTextMessage"
import SendVoiceMessage from "./SendVoiceMessage"

const ConversationFooter = () => {
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const handleShowRecorder = () => {
    setShowVoiceRecorder(true);
  }
  const handleHideRecorder = () => {
    setShowVoiceRecorder(false);
  }
  return (
    <div  className="bg-white dark:bg-sender-bg-dark dark:text-text-primary-dark w-full">
      {
        showVoiceRecorder ? <SendVoiceMessage hideRecorder={handleHideRecorder} />
        : <SendTextMessage showRecorder={handleShowRecorder} />
      }
    </div>
  )
}

export default ConversationFooter