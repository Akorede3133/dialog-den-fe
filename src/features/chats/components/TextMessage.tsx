import { BsCheck2, BsCheck2All } from 'react-icons/bs'
import { formatTime } from '../../../utils/dateTime'
import { HiOutlineClock } from 'react-icons/hi2';

type TextMessageProp = {
  isSender: boolean;
  content: string;
  createdAt: string;
  status: string;
}
const TextMessage = ({ isSender, content, createdAt, status }: TextMessageProp) => {
  const contentArr = content.trim().split(' ');
    
  return (
    <div className={`${isSender ?  ' bg-bg-silver'  : `bg-[#1C9DEA] text-white`} px-2 py-3 flex flex-col gap-2 relative min-w-[70px] max-w-[200px] rounded-md`}>
    <p className='text-sm flex flex-wrap gap-1 mb-2 overflow-hidde '>{
      contentArr.map((letter, index) => {
        return (
          <span className='letter wrap-text' key={index}>{letter}</span>
        )
      })
    }</p>
    <div className='flex gap-1 items-center absolute bottom-0 right-[5%]'>
      <span className={`text-[10px] ${isSender ?' text-text-primary' : 'text-gray-300'}`}>{formatTime(createdAt)}</span>
      { isSender && 
          <div className=''>
            { status === 'sent' && <BsCheck2 /> }
            { status === 'delivered' && <BsCheck2All /> }
            { status === 'read' && <BsCheck2All className=' text-blue-900' /> }
            { status === 'sending' && <HiOutlineClock className='' /> }
          </div> 
      }
    </div>
  </div>
  )
}

export default TextMessage