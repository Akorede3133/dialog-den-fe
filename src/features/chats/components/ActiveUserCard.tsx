import OnlineImage from './OnlineImage';

const ActiveUserCard = () => {
  return (
    <li className='bg-bg-silver flex justify-end py-2 flex-col rounded-md px-4 relative h-[50px]'>
      <OnlineImage />
     <p className=' text-text-primary font-medium text-sm '>Patrick</p>
  </li>
  )
}

export default ActiveUserCard