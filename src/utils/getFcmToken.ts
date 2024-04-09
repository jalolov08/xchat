import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function getFcmToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('FcmToken:', fcmToken);
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('🚀 ~ getFcmToken ~ fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('Error getting token: ', error);
    }
  }
}
