import { ReactNode, useState } from 'react';
import { createContext, useContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import useCurrentUser from '../../auth/hooks/useCurrentUser';
interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: number[];
}

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket| null>(null);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([])
  const { user }  = useCurrentUser();  

  useEffect(()=> {
    const socket = io('http://localhost:3000', {
      query: {
        userId: user?.id
      }
    });
    socket.on('getOnlineUsers', (users: number[]) => {
      setOnlineUsers(users);
    })
    setSocket(socket);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user])
  return <SocketContext.Provider value={{
    socket,
    onlineUsers
  }}>
    { children }
  </SocketContext.Provider>
}

export const useSocketContext = () => (
  useContext(SocketContext)
);