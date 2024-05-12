import { useEffect, useRef, useState } from "react";
import { UserProp } from "../../contacts/components/ContactCard";
import ActiveUserCard from "./ActiveUserCard";

const ActiveUsersList = ({ activeUsers }: { activeUsers: UserProp[] }) => {  
  const enoughActiveUsers = activeUsers.length > 3;
  const ref = useRef<HTMLUListElement>(null)
  const [isDragging, setIsDragging] = useState(false);
  const handleScroll = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isDragging) {
      return;
    }
    const { currentTarget } = e;
    if (currentTarget) {
      currentTarget.scrollLeft -= e.movementX;
    }
  }

  useEffect(() => {
    document.addEventListener('mouseover', (e) => {
      const target = e.target as Node;
      if (target && ref.current?.contains(target)) {
        setIsDragging(false);
      }
    });
  }, [])
  return (
    <ul onMouseMove={handleScroll} onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)} ref={ref} className={`flex overflow-hidden items-center gap-4 py-5 ${enoughActiveUsers && 'cursor-grab'} cursor-grab select-none`}>
    {
      activeUsers.map((user) => (
        <ActiveUserCard key={user.id} user={user} />
      ))
    }
  </ul>
  )
}

export default ActiveUsersList;
