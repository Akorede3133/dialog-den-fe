import { useForm, SubmitHandler } from "react-hook-form"
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin";
import { useAppDispatch } from "../../../redux/hooks";
import { setAuthenticated } from "../../chats/redux/chatSlice";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  type Input = {
    username: string;
    password: string;
  };

  const { register, handleSubmit, formState: {errors } } = useForm<Input>();

  const { loginUser, isLogginIn, error } = useLogin();

  const onSubmit: SubmitHandler<Input> = (data) => {
    loginUser(data, {
      onSuccess: () => {
        dispatch(setAuthenticated(true));
      }
    });
  }
  if (error) {
    toast.error(error.message);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-sidebar-dark rounded-md shadow-md p-4 w-[90%] sm:w-[500px] mx-auto space-y-3 my-10">
      <section className=" space-y-2">
        <label htmlFor="username" className=" text-sm text-text-primary font-semibold">Username</label>
        <div className="border flex gap-3 rounded-md dark:border-bg-dark">
          <button className="bg-bg-silver dark:bg-sidebar-dark p-3">
            <HiOutlineUser className=" text-text-gray dark:text-text-primary-dark" />
          </button>
          <input type="text" placeholder="Enter Username" className=" outline-none text-sm w-full dark:bg-bg-dark dark:text-text-primary-dark " {...register('username', {
            required: 'This field is required'
          })} />
        </div>
        { errors.username && <span className=" text-sm text-red-500">{errors.username.message}</span> }
      </section>
      <section className=" space-y-2">
        <label htmlFor="password" className=" text-sm text-text-primary font-semibold">Password</label>
        <div className="border flex gap-3 rounded-md dark:border-bg-dark">
          <button  className="bg-bg-silver dark:bg-sidebar-dark p-3">
            <HiOutlineLockClosed className=" text-text-gray dark:text-text-primary-dark" />
          </button>
          <input type="password" placeholder="Enter Password" className=" outline-none text-sm w-full dark:bg-bg-dark dark;text-text-primary-dark " {...register('password', {
            required: 'This field is required'
          })} />
        </div>
        { errors.password && <span className=" text-sm text-red-500">{errors.password.message}</span> }
      </section>
      <section className="pt-3">
        <button className="capitalize bg-message-bg-blue w-full text-white py-2 rounded-md" disabled={isLogginIn}>{isLogginIn ? 'Loging in...' : 'Login'}</button>
      </section>
      <section className="text-center dark:text-text-primary-dark space-y-3 pt-5">
        <p>Don&apos;t have an account? <Link to='/register' className="text-message-bg-blue">register</Link></p>
        <p>&copy; 2024 Dialogden</p>
      </section>
    </form>
  )
}

export default LoginForm