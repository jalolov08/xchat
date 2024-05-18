import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import {useNavigation} from '@react-navigation/native';
import {API} from '../../../config';
import Contacts from 'react-native-contacts';
import useContactStore from '../../zustand/useContacts';
import {getContacts} from '../../utils/getContacts';
import LinearGradient from 'react-native-linear-gradient';
import {Contact} from '../../types/contact.type';
import {TUser} from '../../types/user.type';

export default function ChatHeader({
  otherParticipant,
}: {
  otherParticipant: TUser;
}) {
  const {colors, dark} = useScheme();
  const navigation = useNavigation();
  const [contactAdded, setContactAdded] = useState(false);
  const {setContactList, findContactByPhoneNumber} = useContactStore();
  const {phone, fullName, photo} = otherParticipant;
  console.log('🚀 ~ otherParticipant:', otherParticipant);
  const handleSaveNewContacts = async () => {
    const newPerson = {
      phoneNumbers: [
        {
          label: 'mobile',
          number: phone,
        },
      ],
    };

    try {
      await Contacts.openContactForm(newPerson);
      const contacts = await getContacts();
      setContactList(contacts);
      Alert.alert('Контакт успешно добавлен.');
      setContactAdded(true);
    } catch (error) {
      Alert.alert('Ошибка при добавлении контакта.');
      console.error('Error adding contact: ', error);
    }
  };
  const isPhoneNumberInContacts = () => {
    return Boolean(findContactByPhoneNumber(otherParticipant.phone));
  };
  const handlePress = () => {
    if (isPhoneNumberInContacts()) {
      navigation.navigate('AboutContact', {
        contact: findContactByPhoneNumber(otherParticipant.phone),
        user: otherParticipant,
      });
    } else {
      console.log('Contact not found');
    }
  };
  const styles = StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      padding: 16,
    },
    name: {
      fontSize: 19,
      color: colors.text,
      marginLeft: 10,
      fontWeight: '600',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 40,
      marginLeft: 20,
    },
  });
  const gradientColors = useMemo(() => {
    return dark === true
      ? ['#0C1D1E', '#0A1213']
      : [colors.background, colors.background];
  }, [dark, colors]);
  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon
          type={Icons.Ionicons}
          name="arrow-back-outline"
          color={colors.primary}
          size={24}
        />
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handlePress}>
        <Image
          style={styles.image}
          source={{
            uri: `${API}${photo}`,
          }}
        />
        <Text style={styles.name}>{fullName}</Text>
      </Pressable>
      {!isPhoneNumberInContacts() && !contactAdded && (
        <TouchableOpacity
          onPress={handleSaveNewContacts}
          style={{marginLeft: 'auto'}}>
          <Icon
            type={Icons.Ionicons}
            name="person-add"
            color={colors.primary}
            size={24}
          />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}
