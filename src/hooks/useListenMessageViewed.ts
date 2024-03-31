import {useEffect} from 'react';
import {useSocket} from '../contexts/SocketContext/socket.context';
import useMessages from '../zustand/useMessages';

const useListenMessageViewed = () => {
  const {socket} = useSocket();
  const {updateMessageById} = useMessages();

  useEffect(() => {
    const handleMessageViewed = (messageId: string) => {
      updateMessageById(messageId, {viewed: true});
    };

    if (socket) {
      socket.on('messageViewed', message => {
        handleMessageViewed(message._id);
      });
    }

    return () => {
      if (socket) {
        socket.off('messageViewed', handleMessageViewed);
      }
    };
  }, [socket, updateMessageById]);

  return null; 
};

export default useListenMessageViewed;
