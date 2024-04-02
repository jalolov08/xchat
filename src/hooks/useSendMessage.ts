import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../config';
import useMessages from '../zustand/useMessages';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSendMessage = () => {
  const [sending, setSending] = useState(false);
  const { setMessages, messages } = useMessages();
  const sendMessage = async (userId, messageData) => {
    setSending(true);

    try {
      const response = await axios.post(
        `${API_BASE}/chat/send/${userId}`,
        messageData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const updatedMessages = [...messages, response.data];
      await AsyncStorage.setItem(`messages_${userId}`, JSON.stringify(updatedMessages));

      setMessages(updatedMessages);
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error.response.data.error);
      Alert.alert(error.response.data.error);
    } finally {
      setSending(false);
    }
  };

  return { sending, sendMessage };
};

export default useSendMessage;
