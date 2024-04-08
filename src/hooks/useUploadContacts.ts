import axios from 'axios';
import { Contact } from '../types/contact.type';
import { API_BASE } from '../../config';



export const useUploadContacts = () => {
  const uploadContacts = async (contacts: Contact[]) => {
    try {
      const response = await axios.post(`${API_BASE}/contact/upload`, { contacts });
      return response.data;
    } catch (error) {
      console.error('Error uploading contacts:', error);
    }
  };

  return { uploadContacts };
};
