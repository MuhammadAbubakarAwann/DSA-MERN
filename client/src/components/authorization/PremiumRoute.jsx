import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PremiumRoute = ({ children }) => {
  const isPremium = useSelector((state) => state.auth.isPremium);

  return isPremium ? children : <Navigate to="/stack" />;
};

export default PremiumRoute;
