import { useEffect, useRef, useState } from "react";
import { UserProp } from "../../contacts/components/ContactCard";
import ActiveUserCard from "./ActiveUserCard";

const ActiveUsersList = ({ activeUsers }: { activeUsers: UserProp[] }) => {
  const enoughActiveUsers = activeUsers.length > 3;
  const ref = useRef<HTMLUListElement>(null)
  const [isDragging, setIsDragging] = useState(false);
  const handleScroll = (e) => {
    if (!isDragging) {
      return;
    }
    const { currentTarget } = e;
    currentTarget.scrollLeft -= e.movementX;
  }

  useEffect(() => {
    document.addEventListener('mouseover', (e) => {
      if (e?.target?.contains(ref.current)) {
        setIsDragging(false);
      }
    })
  }, [])
  return (
    <ul onMouseMove={handleScroll} onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)} ref={ref} className={`flex overflow-hidden items-center gap-4 py-5 ${enoughActiveUsers && 'cursor-grab'} select-none`}>
    {
      activeUsers.map((user) => (
        <ActiveUserCard key={user.id} user={user} />
      ))
    }
  </ul>
  )
}

export default ActiveUsersList