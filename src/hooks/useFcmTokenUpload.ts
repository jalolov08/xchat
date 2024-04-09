import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_BASE} from '../../config';

const useFcmTokenUpload = () => {
  const uploadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('fcmToken');
      if (storedToken) {
        const res = await axios.post(`${API_BASE}/user/fcmToken`, {
          fcmToken: storedToken,
        });
        console.log(res.data);
      }
    } catch (error) {
      console.error('Error uploading FCM token:', error);
    }
  };

  return {uploadToken};
};

export default useFcmTokenUpload;
