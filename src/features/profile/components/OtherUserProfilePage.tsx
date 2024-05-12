import OtherUserProfile from "./OtherUserProfile"
import OtherUserProfileHeader from "./OtherUserProfileHeader"

const OtherUserProfilePage = () => {
  return (
    <div className="h-full flex flex-col">
      <OtherUserProfileHeader />
      <OtherUserProfile />
    </div>
  )
}

export default OtherUserProfilePage