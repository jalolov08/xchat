import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

export async function getContacts() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Контакты',
        message: 'Это приложение хочет просмотреть ваши контакты.',
        buttonPositive: 'Пожалуйста, примите разрешение.',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const contacts = await Contacts.getAll();
    

      return contacts;
    } else {
      console.log('Contacts permission denied');
      return [];
    }
  } catch (error) {
    console.error('Permission error: ', error);
    return [];
  }
}
