import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedEditorRouteProps {
  children: React.ReactNode;
}

const ProtectedEditorRoute: React.FC<ProtectedEditorRouteProps> = ({ children }) => {
  const { isEditor } = useAuth();
  
  if (!isEditor) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedEditorRoute; 