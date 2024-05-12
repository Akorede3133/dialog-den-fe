import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: loginUser, isPending: isLogginIn, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/');
      toast.success('LoggedIn sucessfully!!')
    }
  });

  return { loginUser, isLogginIn, error }
}

export default useLogin;