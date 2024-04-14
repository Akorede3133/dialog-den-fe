import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineUser } from "react-icons/hi2"
import useCurrentUser from "../../auth/hooks/useCurrentUser"
import { useEffect, useState } from "react"
import { format } from "date-fns"

const ProfileContent = () => {
  const { user } = useCurrentUser()
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      const currenTime = format(new Date(), 'h:mm a')
      setTime(currenTime)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  
  
  return (
    <div  className="px-5 pb-4 h-[200px] max-h-[450px] overflow-auto profile">
      <section className="bg-white py-2 px-4 shadow-md">
        <div className=" flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HiOutlineUser />
            <span className="text-sm">About</span>
          </div>
          <button>
            {false && <HiOutlineChevronUp />}
            <HiOutlineChevronDown />

          </button>
        </div>
        <ul className="space-y-4 my-3">
          <li>
            <p>Name</p>
            <p>{user?.username}</p>
          </li>
          <li>
            <p>Email</p>
            <p>{user?.email}</p>
          </li>
          <li>
            <p>Time</p>
            <p>{time}</p>
          </li>
        </ul>
      </section>
      
    </div>
  )
}

export default ProfileContent