import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Manager, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../../repository/api';

interface SocketContextType {
  getSocket: (namespace: string) => Socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const managerRef = useRef<Manager | null>(null);
  const socketsRef = useRef<Record<string, Socket>>({});

  useEffect(() => {
    // Khởi tạo Socket.IO Manager duy nhất cho client để dùng chung kết nối
    managerRef.current = new Manager(API_BASE_URL, {
      autoConnect: true,
      transports: ['websocket', 'polling']
    });

    return () => {
      // Cleanup: Ngắt kết nối tất cả các namespace socket khi Provider bị unmount
      Object.values(socketsRef.current).forEach((socket) => {
        socket.disconnect();
      });
      socketsRef.current = {};
      managerRef.current = null;
    };
  }, []);

  const getSocket = (namespace: string): Socket => {
    const token = localStorage.getItem('access_token');
    const key = namespace || '/';

    if (!socketsRef.current[key]) {
      if (!managerRef.current) {
        // Fallback dự phòng nếu manager chưa được khởi tạo
        managerRef.current = new Manager(API_BASE_URL, {
          autoConnect: true,
          transports: ['websocket', 'polling']
        });
      }
      // Khởi tạo socket namespace từ manager dùng chung
      socketsRef.current[key] = managerRef.current.socket(key, {
        auth: { token }
      });
    } else {
      // Cập nhật token mới nếu token trong storage đã thay đổi (sau khi refresh token)
      socketsRef.current[key].auth = { token };
    }

    return socketsRef.current[key];
  };

  return (
    <SocketContext.Provider value={{ getSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
