import ActiveUserCard from "./ActiveUserCard"

const ActiveUsers = () => {
  return (
    <ul className='flex overflow-hidden items-center gap-4 py-5'>
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
      <ActiveUserCard />
    </ul>
  )
}

export default ActiveUsers