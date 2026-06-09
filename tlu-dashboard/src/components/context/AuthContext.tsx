import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../../repository/AuthApi';

// Định nghĩa kiểu dữ liệu cho Context
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (accessToken: string, refreshToken: string, userInfo: any) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

// 1. Khởi tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('access_token')
  );
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('user_info');
    return saved ? JSON.parse(saved) : null;
  });

  const refreshProfile = async () => {
    try {
      const response = await getMe();
      if (response.success) {
        setUser(response.data);
        localStorage.setItem('user_info', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated]);

  const login = (accessToken: string, refreshToken: string, userInfo: any) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user_info', JSON.stringify(userInfo));
    setIsAuthenticated(true); // Quan trọng: Kích hoạt render lại toàn bộ App
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      console.log("[AuthContext] Received auth:unauthorized event, logging out...");
      logout();
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook tùy chỉnh để sử dụng nhanh
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};