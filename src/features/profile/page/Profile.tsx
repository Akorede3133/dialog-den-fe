import ProfileContent from "../components/ProfileContent"
import ProfileHeader from "../components/ProfileHeader"

const Profile = () => {
  return (
    <div className="h-full flex flex-col md:relative">
      <ProfileHeader />
      <ProfileContent />
    </div>
  )
}

export default Profile