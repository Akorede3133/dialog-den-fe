import logo from '../../../assets/logo.png';
const ConversationBody = () => {
  return (
    <div className="bg-[#EFF7FE] overflow-auto convo p-3">
      <ul className="flex flex-col gap-5">
      
        <li className=" self-end">
          <div className='flex items-start gap-3 pb-2 text-sm'>
            <span>Alan Joseph</span>
            <span>01:40am</span>
            <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full' />
          </div>
          <p className=" bg-bg-silver p-4 rounded-[50px_50px_0_50px] ">Hi I am Alan</p>
        </li>
        <li className=" self-end">
          <p  className=" bg-bg-silver p-4 rounded-[50px_0_50px_50px] ">your personal assistant to help you 😀</p>
        </li>
        <li className=" self-start text-white">
          <div className='flex text-text-primary items-start gap-3 pb-2 text-sm'>
            <span className='order-2'>Alan Joseph</span>
            <span className='order-3'>01:40am</span>
            <img src={logo} alt="" className='h-[40px] w-[40px] rounded-full order-1' />

          </div>
          <p  className=" bg-[#1C9DEA] p-4 rounded-[50px_50px_50px_0] ">Hi I am Josepine personal assistant to help you 😀</p>
        </li>
        <li className=" self-start text-white">
          <p  className=" bg-[#1C9DEA] p-4 rounded-[0_50px_50px_50px] ">Hi I am Josepine personal assistant to help you 😀</p>
        </li>
      </ul>
    </div>
  )
}

export default ConversationBody