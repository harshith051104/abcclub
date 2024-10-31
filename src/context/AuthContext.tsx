import React, { createContext, useContext, useState } from 'react';
import { User, AuthContext as IAuthContext } from '../types';

const AuthContext = createContext<IAuthContext>({
  user: null,
  isEditor: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    isEditor: user?.role === 'editor',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);