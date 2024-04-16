const SenderImageCard = ({ user }) => {

  return (
    <div className='flex items-start gap-3 pb-2 mb-[-5px] text-sm self-end'>
      <span>{user?.username}</span>
      <img src={user?.photo} alt="" className='h-[40px] w-[40px] rounded-full object-cover' />
    </div> 
  )
}

export default SenderImageCard