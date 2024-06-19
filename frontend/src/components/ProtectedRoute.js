import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return children;
};
