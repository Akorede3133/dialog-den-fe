import { ReactNode, useState } from 'react';
import { createContext, useContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";
interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket| null>(null);
  useEffect(()=> {
    const socket = io('http://localhost:3000');
    setSocket(socket);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [])
  return <SocketContext.Provider value={{
    socket
  }}>
    { children }
  </SocketContext.Provider>
}

export const useSocketContext = () => (
  useContext(SocketContext)
);