import {useState} from 'react';
import axios from 'axios';
import {API_BASE} from '../../config';
import useBlockedUsers from '../zustand/useBlockedUsers';

export const useBlockUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {blockUser: blockUserById} = useBlockedUsers();

  const blockUser = async (userId: string) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/user/block`, {userId});
      blockUserById(userId);
    } catch (error) {
      console.error('Error blocking user:', error.response);
    } finally {
      setIsLoading(false);
    }
  };

  return {blockUser, isLoading};
};
