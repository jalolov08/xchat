import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

export async function getContacts() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const contacts = await Contacts.getAll();
      // const allNumbers = contacts.reduce((numbers, contact) => {
      //   const contactNumbers = contact.phoneNumbers.map(
      //     phoneNumber => phoneNumber.number,
      //   );
      //   return [...numbers, ...contactNumbers];
      // }, []);

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
