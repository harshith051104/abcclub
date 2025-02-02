import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'editor';
}

interface AuthContextType {
  isEditor: boolean;
  isUser: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isEditor, setIsEditor] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsEditor(userRole === 'admin' || userRole === 'editor');
    setIsUser(userRole === 'user');
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((user: User) => user.email === email)) {
        throw new Error('User already exists');
      }

      // Add new user
      const newUser: User = {
        name,
        email,
        password, // In a real app, this should be hashed
        role: 'user'
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Admin login - updated email
      if (email === 'abcclub.icfaitech@ifheindia.org' && password === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('registeredUser', JSON.stringify({ email, name: 'ABC Club' }));
        setIsEditor(true);
        setIsUser(false);
        return;
      }

      // Regular user login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User) => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      localStorage.setItem('userRole', user.role);
      localStorage.setItem('registeredUser', JSON.stringify({ 
        email: user.email, 
        name: user.name 
      }));
      setIsEditor(user.role === 'admin' || user.role === 'editor');
      setIsUser(user.role === 'user');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('registeredUser');
    setIsEditor(false);
    setIsUser(false);
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      // Get current user email from localStorage
      const registeredUser = localStorage.getItem('registeredUser');
      if (!registeredUser) {
        throw new Error('No user logged in');
      }
      const { email } = JSON.parse(registeredUser);

      // Handle admin password change
      if (email === 'abcclub.icfaitech@ifheindia.org') {
        if (oldPassword !== 'admin123') {
          throw new Error('Current password is incorrect');
        }
        // Update admin password (in a real app, this would be handled differently)
        // For demo purposes, we'll just show success
        return true;
      }

      // For regular users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(
        (u: User) => u.email === email && u.password === oldPassword
      );

      if (userIndex === -1) {
        throw new Error('Current password is incorrect');
      }

      // Update the password
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));

      return true;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isEditor, isUser, login, logout, register, changePassword }}>
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