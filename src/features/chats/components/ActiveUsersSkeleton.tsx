const ActiveUsersSkeleton = () => {
  return (
    <li className='bg-gray-300 flex items-center justify-end py-2 flex-col rounded-md px-4 w-[70px] relative h-[50px]'>
      <div className='absolute top-[-30%] left-[50%] translate-x-[-50%] bg-gray-200 rounded-full'>
        <div  className='w-[30px] h-[30px] rounded-full'/>
      </div>
      <p className=' w-[40px] h-[10px] bg-gray-200'></p>
    </li>
  )
}

export default ActiveUsersSkeleton