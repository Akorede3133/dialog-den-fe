import logo from '../../../assets/logo.png';

const OnlineImage = () => {
  return (
    <div className='absolute top-[-30%] left-[50%] translate-x-[-50%] bg-red-50'>
      <img src={logo} alt="" className='w-[30px] h-[30px] rounded-full'/>
      <span className='bg-green-500 h-[10px] w-[10px] rounded-full border border-white absolute top-[50%] right-0'></span>
    </div>
  )
}

export default OnlineImage