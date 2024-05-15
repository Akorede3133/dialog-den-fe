import { useAppSelector } from "../../../redux/hooks"
import { selectChat } from "../redux/chatSlice"

const ReceiverImageCard = () => {
  const { receiver } = useAppSelector(selectChat)
  return (
    <div className='flex items-start self-start gap-3 text-sm mb-[15px] dark:text-text-primary-dark'>
      <img src={receiver?.photo} alt="" className='h-[40px] w-[40px]  rounded-full object-cover' />
      <span>{receiver?.username}</span>
    </div> 
  )
}

export default ReceiverImageCard