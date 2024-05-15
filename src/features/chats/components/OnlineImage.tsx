const OnlineImage = ({ photo }: { photo: string}) => {
  return (
    <div className='absolute top-[-30%] left-[50%] translate-x-[-50%]'>
      <img src={photo} alt="" className='w-[30px] h-[30px] rounded-full object-cover'/>
      <span className='bg-green-500 h-[10px] w-[10px] rounded-full border border-white absolute top-[50%] right-0'></span>
    </div>
  )
}

export default OnlineImage