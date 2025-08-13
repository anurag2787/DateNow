import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

function RequireAuth({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};


