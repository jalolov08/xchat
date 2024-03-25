import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useMessages from '../zustand/useMessages';
import { API_BASE } from '../../config';

export const useGetMessages = (userId: string) => {
  const { setMessages } = useMessages();
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/chat/${userId}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch messages');
        }

        const messages = response.data;

        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMessages();

    return () => {};
  }, [userId, setMessages]);

  return { loading }; 
};
