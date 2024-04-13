import { useEffect, useRef, useState } from "react"
import ActiveUserCard from "./ActiveUserCard"

const ActiveUsers = () => {
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
    <ul onMouseMove={handleScroll} onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)} ref={ref} className='flex overflow-hidden items-center gap-4 py-5 cursor-grab select-none'>
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />

    </ul>
  )
}

export default ActiveUsers