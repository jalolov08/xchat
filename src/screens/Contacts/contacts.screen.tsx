import React, {useEffect, useState, useMemo} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {styles as contactsStyles} from './contacts.style';
import Search from '../../ui/Search/search.ui';
import {getContacts} from '../../utils/getContacts';
import axios from 'axios';
import {API, API_BASE} from '../../../config';
import {TUser} from '../../types/user.type';
import Lottie from '../../ui/Lottie/lottie.ui';
import contact from '../../assets/animations/contact.json';
import errorLoad from '../../assets/animations/error.json';
import empty from '../../assets/animations/empty.json';
import useContactStore from '../../zustand/useContacts';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import {useGetBlockedUsers} from '../../hooks/useGetBlockedUsers';
import {useUploadContacts} from '../../hooks/useUploadContacts';
import {Contact} from '../../types/contact.type';

export default function ContactsScreen({navigation}) {
  useGetBlockedUsers();
  const {contactList, setContactList} = useContactStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const styles = contactsStyles();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const {uploadContacts} = useUploadContacts();
  const {colors} = useScheme();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContacts();
        setContacts(contacts);
        const allNumbers = contacts.reduce((numbers, contact) => {
          const contactNumbers = contact.phoneNumbers.map(
            phoneNumber => phoneNumber.number,
          );
          return [...numbers, ...contactNumbers];
        }, []);
        setContactList(contacts);
        await syncContacts(allNumbers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || 'Failed to fetch contacts.');
      }
    };

    fetchContacts();
  }, []);
  useEffect(() => {
    const handleUploadContacts = async () => {
      try {

        const response = await uploadContacts(contacts);
        console.log(response);
      } catch (error) {
        console.error('Failed to upload contacts:', error);
      }
    };
    handleUploadContacts();
  }, [contacts]);

  async function syncContacts(contacts: string[]) {
    try {
      const response = await axios.post<{users: TUser[]}>(
        `${API_BASE}/user/sync`,
        {phones: contacts},
      );
      setUsers(response.data.users);
    } catch (error) {
      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  }

  const sortedFilteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const fullName = `${user.name} ${user.surname}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        const fullNameA = `${a.name} ${a.surname}`.toLowerCase();
        const fullNameB = `${b.name} ${b.surname}`.toLowerCase();
        if (fullNameA < fullNameB) {
          return -1;
        }
        if (fullNameA > fullNameB) {
          return 1;
        }
        return 0;
      });
  }, [users, searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Контакты</Text>
      <Search
        containerStyle={{marginTop: 20}}
        value={searchQuery}
        onChange={setSearchQuery}
      />

      {loading ? (
        <Lottie
          source={contact}
          width={200}
          height={200}
          style={{alignSelf: 'center', marginTop: 100}}
        />
      ) : null}
      {error && (
        <Lottie
          source={errorLoad}
          width={200}
          height={200}
          style={{alignSelf: 'center', marginTop: 100}}
        />
      )}
      {sortedFilteredUsers.length === 0 &&
        !loading &&
        !error &&
        searchQuery.length > 0 && (
          <Lottie
            source={empty}
            width={200}
            height={200}
            style={{alignSelf: 'center', marginTop: 100}}
          />
        )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedFilteredUsers.map(user => {
          const {name, surname, photoUri, phone, _id} = user;
          const contact = contactList.find(contact =>
            contact.phoneNumbers.some(
              phoneNumber => phoneNumber.number === phone,
            ),
          );

          let contactName = name + ' ' + surname;

          if (contact) {
            contactName = contact.displayName;
          }

          return (
            <TouchableOpacity
              style={styles.contact}
              key={_id}
              onPress={() =>
                navigation.navigate('AboutContact', {user, contact})
              }>
              <Image source={{uri: `${API}${photoUri}`}} style={styles.image} />
              <Text style={styles.fullName}>{contactName}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
