import { useMutation } from "@tanstack/react-query"
import { register } from "../api/auth"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useRegister = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending: isRegistering, error } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/');
      toast.success('Registered')
    }
  });
  return { registerUser, isRegistering, error }
}

export default useRegister;