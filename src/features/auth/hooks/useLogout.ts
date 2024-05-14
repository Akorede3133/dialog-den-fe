import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending: isLoggingOut, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login');
      toast.success('Loggedout sucessfully!!')
      queryClient.removeQueries();

    }
  });

  return { logoutUser, isLoggingOut, error }
}

export default useLogout;