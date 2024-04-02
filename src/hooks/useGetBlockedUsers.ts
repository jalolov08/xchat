import {useState, useEffect} from 'react';
import axios from 'axios';
import useBlockedUsers from '../zustand/useBlockedUsers';
import {API_BASE} from '../../config';

export const useGetBlockedUsers = () => {
  const {setBlockedUsers} = useBlockedUsers();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/user/blocked`);
        setBlockedUsers(response.data)
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching blocked users:', error);
      }
    };

    fetchData();
  }, [setBlockedUsers]);

  return;
};
