import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user_id = localStorage.getItem("user_id");
  if (!user_id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
