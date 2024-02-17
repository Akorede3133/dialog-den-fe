import logo from '../../../assets/logo.png';

const RecentChatCard = () => {
  return (
    <li className="flex justify-between items-center">
      <section className="flex items-center gap-4">
        <div className='relative w-[30px] h-[30px]'>
          <img src={logo} alt="" className='w-fu;ll h-full rounded-full'/>
          <span className='bg-green-500 h-[10px] w-[10px] rounded-full border border-white absolute top-[50%] right-0'></span>
        </div>
        <div className="flex flex-col">
          <span>Patrick Hendricks</span>
          <span className="text-sm text-text-gray">Hey! there I'm available</span>
        </div>
      </section>
      <span className="text-[12px] text-text-gray">02:50PM</span>
    </li>
  )
}

export default RecentChatCard