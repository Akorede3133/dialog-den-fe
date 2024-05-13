import { useNavigate } from "react-router-dom"
import useCurrentUser from "../features/auth/hooks/useCurrentUser";
import { useEffect } from "react";
import { Spin } from "antd";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, isGettingUser } = useCurrentUser();

  useEffect(() => {
    if (!user && !isGettingUser) {
      return navigate('/login');
    }

  }, [user, isGettingUser, navigate])
  
  if (isGettingUser) {
    return <div className="min-h-screen h-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  }

  if (user) return children;
 
}

export default ProtectedRoute