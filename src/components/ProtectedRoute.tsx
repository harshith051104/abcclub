import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  editorOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, editorOnly = false }) => {
  const { isEditor } = useAuth();
  
  if (editorOnly && !isEditor) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 