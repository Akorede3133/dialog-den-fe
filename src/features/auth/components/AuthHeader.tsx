import logo from '../../../assets/chat-logo.png';

type AuthHeaderProp = {
  action: string;
  description: string;
}
const AuthHeader = ({ action, description }: AuthHeaderProp) => {
  return (
    <section className='flex flex-col justify-center items-center gap-10'>
      <div className='flex gap-3 items-center'>
        <img src={logo} alt="" className='w-[30px] object-cover'/>
        <h3 className=' text-text-primary text-2xl font-medium'>DialogueDen</h3>
      </div>
      <div className=' flex items-center flex-col'>
        <h3 className='text-xl  text-text-primary font-medium'>{action}</h3>
        <p className=' text-text-gray'>{description}</p>  
      </div>
    </section>
  )
}

export default AuthHeader