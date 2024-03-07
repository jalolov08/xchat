import React, {useState, useEffect} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {darkColors} from '../../constants/darkColors.constant';
import HeaderBack from '../../ui/HeaderBack/headerBack.ui';
import {API} from '../../../config';
import {TextInput} from 'react-native-paper';
import Contacts from 'react-native-contacts';

const EditContact = ({route, navigation}) => {
  const {user, contact} = route.params;
  const [firstName, setFirstName] = useState(contact.givenName);
  const [lastName, setLastName] = useState(contact.familyName);

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

      navigation.goBack();
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
          placeholderTextColor={darkColors.placeHolder}
          mode="flat"
          style={styles.input}
          textColor={darkColors.text}
          underlineColor={darkColors.accent}
          activeUnderlineColor={darkColors.placeHolder}
        />
        <TextInput
          label="Фамилия"
          value={lastName}
          onChangeText={text => setLastName(text)}
          placeholderTextColor={darkColors.placeHolder}
          mode="flat"
          style={styles.input}
          textColor={darkColors.text}
          underlineColor={darkColors.accent}
          activeUnderlineColor={darkColors.placeHolder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
  },
  contactCont: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: darkColors.border,
    borderBottomWidth: 1,
  },
  contactPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  contactName: {
    fontSize: 24,
    fontWeight: '600',
    color: darkColors.text,
  },
  contactPhone: {
    fontSize: 17,
    color: darkColors.placeHolder,
  },
  input: {
    fontSize: 18,
    marginTop: 12,
    backgroundColor: 'transparent',
    borderColor: darkColors.border,
  },
});

export default EditContact;
