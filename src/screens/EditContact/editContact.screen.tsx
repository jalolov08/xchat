import React, {useState, useEffect} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import HeaderBack from '../../ui/HeaderBack/headerBack.ui';
import {API} from '../../../config';
import {TextInput} from 'react-native-paper';
import Contacts from 'react-native-contacts';
import useContactStore from '../../zustand/useContacts';
import {styles as editStyles} from './editContact.style';
import { useScheme } from '../../contexts/ThemeContext/theme.context';
const EditContact = ({route, navigation}) => {
  const {user, contact} = route.params;
  const [firstName, setFirstName] = useState(contact.givenName);
  const [lastName, setLastName] = useState(contact.familyName);
  const updateContact = useContactStore(state => state.updateContact);
  const styles = editStyles();
  const {colors} = useScheme()
  useEffect(() => {
    requestWriteContactsPermission();
  }, []);

  const handleSaveContact = async () => {
    try {
      const updatedContact = {
        ...contact,
        givenName: firstName,
        familyName: lastName,
      };

      await Contacts.updateContact(updatedContact);
      updateContact(updatedContact);
      navigation.navigate('Contacts');
    } catch (error) {
      console.error('Ошибка при сохранении контакта:', error);
    }
  };

  const requestWriteContactsPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS;
        const result = await PermissionsAndroid.request(permission);
        if (result === 'granted') {
          console.log('Разрешение на запись контактов получено');
        } else {
          console.log('Разрешение на запись контактов отклонено');
        }
      }
    } catch (error) {
      console.error('Ошибка при запросе разрешения WRITE_CONTACTS:', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack
        backIcon={true}
        title="Изменить контакт"
        rightIconName="checkmark"
        onRightIconClick={handleSaveContact}
      />
      <View style={styles.contactCont}>
        <Image
          source={{uri: `${API}${user.photoUri}`}}
          style={styles.contactPhoto}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.contactName}>{contact.displayName}</Text>
          <Text style={styles.contactPhone}>
            {contact.phoneNumbers[0].number}
          </Text>
        </View>
      </View>
      <View style={{padding: 16}}>
        <TextInput
          label="Имя*"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          placeholderTextColor={colors.placeHolder}
          mode="flat"
          style={styles.input}
          textColor={colors.text}
          underlineColor={colors.accent}
          activeUnderlineColor={colors.placeHolder}
        />
        <TextInput
          label="Фамилия"
          value={lastName}
          onChangeText={text => setLastName(text)}
          placeholderTextColor={colors.placeHolder}
          mode="flat"
          style={styles.input}
          textColor={colors.text}
          underlineColor={colors.accent}
          activeUnderlineColor={colors.placeHolder}
        />
      </View>
    </View>
  );
};
export default EditContact;
