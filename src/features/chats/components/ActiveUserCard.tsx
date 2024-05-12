import { useAppDispatch } from '../../../redux/hooks';
import { UserProp } from '../../contacts/components/ContactCard';
import { displayCoversation, setReceiver } from '../redux/chatSlice';
import OnlineImage from './OnlineImage';

const ActiveUserCard = ({ user }: { user: UserProp}) => {
  const dispatch = useAppDispatch();
  const handleSelectChat = () => {
    dispatch(setReceiver(user));
    dispatch(displayCoversation(true));
  }
  return (
    <li className='bg-bg-silver flex justify-end py-2 flex-col rounded-md px-4 relative h-[50px]' onClick={handleSelectChat}>
      <OnlineImage photo={user?.photo} />
      <p className=' text-text-primary font-medium text-sm '>{user?.username}</p>
    </li>
  )
}

export default ActiveUserCard