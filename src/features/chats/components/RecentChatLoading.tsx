const RecentChatLoading = () => {
  return (
    <div className="flex cursor-pointer justify-between items-center w-full animate-pulse">
      <section className="flex items-center gap-4">
        <div className='relative bg-gray-300 w-[30px] h-[30px] rounded-full'>
        </div>
        <div className="flex flex-col gap-2">
          <p className="bg-gray-300 w-[70px] h-[20px] rounded-md"></p>
          <p className="bg-gray-300 w-[70px] h-[20px] rounded-md"></p>
        </div> 
      </section>
      <div>
      <p className="bg-gray-300 w-[70px] h-[20px] rounded-md"></p>
      </div>
    </div>
  )
}

export default RecentChatLoading