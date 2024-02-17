import logo from '../../../assets/logo.png';

const ActiveUserCard = () => {
  return (
    <li className='bg-bg-silver flex justify-end py-2 flex-col rounded-md px-4 relative h-[50px]'>
    <div className='absolute top-[-30%] left-[50%] translate-x-[-50%] bg-red-50'>
      <img src={logo} alt="" className='w-[30px] h-[30px] rounded-full'/>
      <span className='bg-green-500 h-[10px] w-[10px] rounded-full border border-white absolute top-[50%] right-0'></span>
    </div>
    <p className=' text-text-primary font-medium text-sm '>Patrick</p>
  </li>
  )
}

export default ActiveUserCard