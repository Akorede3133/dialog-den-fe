import logo from '../../../assets/chat-logo.png';

const RegisterHeader = () => {
  return (
    <section className='flex flex-col justify-center items-center gap-10'>
      <div className='flex gap-3 items-center'>
        <img src={logo} alt="" className='w-[30px] object-cover'/>
        <h3 className=' text-text-primary text-2xl font-medium'>DialogueDen</h3>
      </div>
      <div className=' flex items-center flex-col'>
        <h3 className='text-xl  text-text-primary font-medium'>Register</h3>
        <p className=' text-text-gray'>Get your DialogueDen account now.</p>  
      </div>
    </section>
  )
}

export default RegisterHeader