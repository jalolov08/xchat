import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMessages from '../zustand/useMessages';
import {API_BASE} from '../../config';

export const useGetMessages = (userId: string) => {
  const {setMessages} = useMessages();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const savedMessagesJSON = await AsyncStorage.getItem(
          `messages_${userId}`,
        );
        if (savedMessagesJSON) {
          const savedMessages = JSON.parse(savedMessagesJSON);
          setMessages(savedMessages);
          setLoading(false);
        }

        const response = await axios.get(`${API_BASE}/chat/${userId}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch messages');
        }

        const messages = response.data;

        await AsyncStorage.setItem(
          `messages_${userId}`,
          JSON.stringify(messages),
        );

        setMessages(messages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {};
  }, [userId, setMessages]);

  return {loading, error};
};
