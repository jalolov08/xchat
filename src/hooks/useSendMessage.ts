import {useState} from 'react';
import axios from 'axios';
import {API_BASE} from '../../config';
import useMessages from '../zustand/useMessages';

const useSendMessage = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const {setMessages, messages} = useMessages();
  const sendMessage = async (userId, messageData) => {
    setSending(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE}/chat/send/${userId}`,
        messageData,
      );

      setMessages([...messages, response.data]);
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error);
    } finally {
      setSending(false);
    }
  };

  return {sending, error, sendMessage};
};

export default useSendMessage;
