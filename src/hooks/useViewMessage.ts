import { useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../../config';
import useMessages from '../zustand/useMessages';

const useViewMessage = (
  messageId: string,
  isReceiver: boolean,
  isViewed: boolean,
) => {
  const { getMessageById } = useMessages();
  
  useEffect(() => {
    const viewMessage = async () => {
      if (isReceiver && !isViewed) {
        try {
          console.log(getMessageById(messageId));
          const res = await axios.put(`${API_BASE}/chat/${messageId}/viewed`);
          console.log('changed', messageId);
          console.log(res.data)
        } catch (error) {
          console.error(`Error viewing message with ID ${messageId}:`, error);
        }
      }
    };

    viewMessage();

  }, []); 


  return () => {};
};

export default useViewMessage;
