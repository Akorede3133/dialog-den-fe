import AuthHeader from "../components/AuthHeader"
import RegisterForm from "../components/RegisterForm"

const Register = () => {
  return (
    <div className=" bg-bg-silver flex flex-col items-center justify-center min-h-screen py-10">
      <AuthHeader action="Register" description="Get your DialogueDen account now." />
      <RegisterForm />
    </div>
  )
}

export default Register