import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isEditor: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsEditor(userRole === 'admin' || userRole === 'editor');
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual API call
      if (email === 'admin@abcclub.com' && password === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('registeredUser', JSON.stringify({ email, name: 'ABC Club' }));
        setIsEditor(true);
      } else {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('registeredUser', JSON.stringify({ email }));
        setIsEditor(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('registeredUser');
    setIsEditor(false);
  };

  return (
    <AuthContext.Provider value={{ isEditor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 