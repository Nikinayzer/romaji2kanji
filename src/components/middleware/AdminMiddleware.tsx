import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';

interface AdminMiddlewareProps {
  children: React.ReactNode;
}

const AdminMiddleware: React.FC<AdminMiddlewareProps> = ({ children }) => {
  const isAdmin = useAppSelector((state) => state.session.isAdmin);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminMiddleware;