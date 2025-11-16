import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RoleRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!user.roles || !user.roles.includes(requiredRole)) return <div>Forbidden - role required: {requiredRole}</div>;
  return children;
};

export default RoleRoute;
