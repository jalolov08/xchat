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

  const connectSocket = () => {
    const newSocket = io(API, {
      query: {
        token: authState?.token,
      },
    });

    newSocket.on('chats', chats => {
      console.log(chats);
      setChats(chats);
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    if (authState && authState.authenticated) {
      connectSocket();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [authState]);

  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        connectSocket();
      });
    }

    return () => {
      if (socket) {
        socket.off('disconnect');
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};
