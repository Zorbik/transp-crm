import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../storage/session";

export const PrivateRoute = ({ children }) => {
  const isAuth = Boolean(isLoggedIn());

  return isAuth ? children : <Navigate to="/login" />;
};
