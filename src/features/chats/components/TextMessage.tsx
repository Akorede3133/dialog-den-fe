import { BsCheck2, BsCheck2All } from 'react-icons/bs'
import { formatTime } from '../../../utils/dateTime'

type TextMessageProp = {
  isSender: boolean;
  content: string;
  createdAt: string;
  status: string;
}
const TextMessage = ({ isSender, content, createdAt, status }: TextMessageProp) => {
  return (
    <div className={`${isSender ?  'mr-[3.2rem] bg-bg-silver'  : `bg-[#1C9DEA]  ml-[3.2rem] text-white`} px-1 py-3 flex flex-col gap-2 relative w-full rounded-md`}>
    <span className='text-sm wrap-text mb-2'>{content}</span>
    <div className='flex gap-1 items-center absolute bottom-[1%] right-[5%]'>
      <span className={`text-[10px] ${isSender ?' text-text-primary' : 'text-gray-300'}`}>{formatTime(createdAt)}</span>
      { isSender && 
          <div className=''>
            { status === 'sent' && <BsCheck2 /> }
            { status === 'delivered' && <BsCheck2All /> }
            { status === 'read' && <BsCheck2All className=' text-blue-900' /> }

          </div> 
      }
    </div>
  </div>
  )
}

export default TextMessage