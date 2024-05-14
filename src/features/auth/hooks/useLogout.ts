import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending: isLoggingOut, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login');
      toast.success('Loggedout sucessfully!!')
    }
  });

  return { logoutUser, isLoggingOut, error }
}

export default useLogout;