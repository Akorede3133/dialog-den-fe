import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineUser } from "react-icons/hi2"
import useCurrentUser from "../../auth/hooks/useCurrentUser"
import { useEffect, useRef, useState } from "react"
import { format } from "date-fns"

const ProfileContent = () => {
  const { user } = useCurrentUser()
  
  const aboutRef = useRef<HTMLUListElement>(null);
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [showABout, setShowAbout] = useState(false);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
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
    <div  className="px-5 pb-4 h-full overflow-auto profile">
      <section  onClick={() => setShowAbout((prev) => !prev)} className=" bg-bg-silver pt-2 dark:bg-[#2a3339] shadow-md">
        <button className="w-full flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <HiOutlineUser />
            <span className="text-sm">About</span>
          </div>
          <div>
            {
            showABout ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />
            }

          </div>
        </button>
        <ul ref={aboutRef} className={`${!showABout ? 'h-[0px]' : 'h-auto py-2' } overflow-hidden space-y-4 my-3 transition-all duration-[0.3s] bg-white px-4 dark:bg-[#2a3339]`}>
          <li>
            <p className="text-sm text-text-gray">Name</p>
            <p className=" font-medium text-sm">{user?.username}</p>
          </li>
          <li>
            <p className="text-sm text-text-gray">Email</p>
            <p className=" font-medium text-sm">{user?.email}</p>
          </li>
          <li>
            <p className="text-sm text-text-gray">Time</p>
            <p className=" font-medium text-sm">{time}</p>
          </li>
          <li>
            <p className="text-sm text-text-gray">TimeZone</p>
            <p className=" font-medium text-sm">{timezone}</p>
          </li>
        </ul>
      </section>
      
    </div>
  )
}

export default ProfileContent