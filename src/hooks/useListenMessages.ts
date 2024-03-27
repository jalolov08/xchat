import { useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext/socket.context';
import useMessages from '../zustand/useMessages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useListenMessages = () => {
  const { socket } = useSocket();
  const { addMessage } = useMessages();

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', async newMessage => {
        addMessage(newMessage.message);

        try {
          const storedMessagesJSON = await AsyncStorage.getItem(`messages_${newMessage.message.senderId}`);
          let storedMessages = storedMessagesJSON ? JSON.parse(storedMessagesJSON) : [];

          storedMessages = [...storedMessages, newMessage.message];

          await AsyncStorage.setItem(`messages_${newMessage.message.senderId}`, JSON.stringify(storedMessages));
        } catch (error) {
          console.error('Error saving message to AsyncStorage:', error);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, addMessage]);
};

export default useListenMessages;
