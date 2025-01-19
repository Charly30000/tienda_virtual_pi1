import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (isAuthenticated: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthRedirect;
