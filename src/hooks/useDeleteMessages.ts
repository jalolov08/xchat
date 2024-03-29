import {useState} from 'react';
import axios from 'axios';
import {API_BASE} from '../../config';
import useSelect from '../zustand/useSelect';
import useMessages from '../zustand/useMessages';

export const useDeleteMessages = () => {
  const [error, setError] = useState(null);
  const {selectedItems: messageIds} = useSelect();
  const {deleteMessages: deleteMessagesArray} = useMessages();

  const deleteMessages = async () => {
    try {
      if (messageIds.length === 0) {
        throw new Error('No messages selected for deletion');
      }

      deleteMessagesArray(messageIds);

      await axios.delete(`${API_BASE}/chat/delete`, {
        data: {messageIds},
      });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return {deleteMessages, error};
};
