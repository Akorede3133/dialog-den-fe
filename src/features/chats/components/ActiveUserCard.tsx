import { UserProp } from '../../contacts/components/ContactCard';
import OnlineImage from './OnlineImage';

const ActiveUserCard = ({ user }: { user: UserProp}) => {
  return (
    <li className='bg-bg-silver flex justify-end py-2 flex-col rounded-md px-4 relative h-[50px]'>
      <OnlineImage photo={user?.photo} />
     <p className=' text-text-primary font-medium text-sm '>{user?.username}</p>
  </li>
  )
}

export default ActiveUserCard