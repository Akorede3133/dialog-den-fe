import { useForm, SubmitHandler } from "react-hook-form"
import { HiOutlineMail } from "react-icons/hi"
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2"
import { Link } from "react-router-dom"
import useRegister from "../hooks/useRegister"
import toast from "react-hot-toast"

const RegisterForm = () => {
  type Inputs = {
    username: string,
    email: string,
    password: string
  }
  const { handleSubmit, register, formState: { errors} } = useForm<Inputs>();
  const { registerUser, isRegistering, error } = useRegister();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerUser(data);
    
  }
  if (error) {
    toast.error(error.message)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-sidebar-dark rounded-md shadow-md p-4 w-[90%] sm:w-[500px] mx-auto space-y-3 my-10">
      <section className=" space-y-2">
        <label htmlFor="email" className=" text-sm text-text-primary font-semibold">Email</label>
        <div className="border dark:border-bg-dark flex gap-3 rounded-md">
          <button className="bg-bg-silver dark:bg-sidebar-dark p-3">
            <HiOutlineMail className=" text-text-gray dark:text-text-primary-dark" />
          </button>
          <input type="email" placeholder="Enter Email" className=" outline-none text-sm w-full dark:bg-bg-dark dark:text-text-primary-dark" {...register('email', {
            required: 'This field is required',
          })} />
        </div>
        {
          errors.email && <span className=" text-sm text-red-500">{errors.email.message}</span>
        }
      </section>
      <section className=" space-y-2">
        <label htmlFor="username" className=" text-sm text-text-primary font-semibold">Username</label>
        <div className="border dark:border-bg-dark flex gap-3 rounded-md">
          <button className="bg-bg-silver dark:bg-sidebar-dark p-3">
            <HiOutlineUser className=" text-text-gray dark:text-text-primary-dark" />
          </button>
          <input type="text" placeholder="Enter Username" className=" outline-none text-sm w-full dark:bg-bg-dark dark:text-text-primary-dark" {...register('username', {
            required: 'This field is required'
          })} />
        </div>
        {
          errors.username && <span className=" text-sm text-red-500">{errors.username.message}</span>
        }
      </section>
      <section className=" space-y-2">
        <label htmlFor="password" className=" text-sm text-text-primary font-semibold">Password</label>
        <div className="border dark:border-bg-dark flex gap-3 rounded-md">
          <button className="bg-bg-silver dark:bg-sidebar-dark p-3">
            <HiOutlineLockClosed className=" text-text-gray dark:text-text-primary-dark" />
          </button>
          <input type="password" placeholder="Enter Password" className=" outline-none text-sm w-full dark:bg-bg-dark dark:text-text-primary-dark" {...register('password', {
            required: 'This field is required'
          })} />
        </div>
        {
          errors.password && <span className=" text-sm text-red-500">{errors.password.message}</span>
        }
      </section>
      <section className="pt-3">
        <button className="capitalize bg-message-bg-blue w-full text-white py-2 rounded-md" disabled={isRegistering}>{isRegistering ? 'Registering...' : 'Register'}</button>
      </section>
      <section className="text-center space-y-3 pt-5 dark:text-text-primary-dark">
        <p>Already have an account? <Link to='/login' className="text-message-bg-blue">Signin</Link></p>
        <p>&copy; 2024 Dialogden</p>
      </section>
    </form>
  )
}

export default RegisterForm