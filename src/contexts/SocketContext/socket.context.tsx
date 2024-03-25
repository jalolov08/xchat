import {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from '../AuthContext/auth.context';
import {Socket, io} from 'socket.io-client';
import {API} from '../../../config';
import useChats from '../../zustand/useChats';
interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType>({socket: null});

export const useSocket = (): SocketContextType => {
  return useContext(SocketContext);
};

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {authState} = useAuth();
  const {setChats} = useChats();
  useEffect(() => {
    if (authState && authState.authenticated) {
      const socket = io(API, {
        query: {
          "token": authState?.token,
        },
      });
      setSocket(socket);
      socket.on('chats', chats => {
        console.log(chats);

        setChats(chats);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};
