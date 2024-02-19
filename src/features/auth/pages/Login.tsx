import AuthHeader from "../components/AuthHeader"

const Login = () => {
  return (
    <div  className=" bg-bg-silver flex flex-col items-center justify-center min-h-screen py-10">
      <AuthHeader action="Signin" description="Signin to your DialogueDen account." />
    </div>
  )
}

export default Login