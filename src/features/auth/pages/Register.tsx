import RegisterForm from "../components/RegisterForm"
import RegisterHeader from "../components/RegisterHeader"

const Register = () => {
  return (
    <div className=" bg-bg-silver flex flex-col items-center justify-center min-h-screen py-10">
      <RegisterHeader />
      <RegisterForm />
    </div>
  )
}

export default Register