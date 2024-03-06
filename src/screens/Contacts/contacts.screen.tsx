import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import styles from './contacts.style';
import Search from '../../ui/Search/search.ui';
import {getContacts} from '../../utils/getContacts';
import axios from 'axios';
import {API, API_BASE} from '../../../config';
import {TUser} from '../../types/user.type';
import Lottie from '../../ui/Lottie/lottie.ui';
import contact from '../../assets/animations/contact.json';
import errorLoad from '../../assets/animations/error.json';
import empty from '../../assets/animations/empty.json';

export default function ContactsScreen() {
  const [contactList, setContactList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const contacts: string[] = await getContacts();
        setContactList(contacts);
        await syncContacts(contacts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || 'Failed to fetch contacts.');
      }
    };

    fetchContacts();
  }, []);

  async function syncContacts(contacts: string[]) {
    try {
      const response = await axios.post<{users: TUser[]}>(
        `${API_BASE}/user/sync`,
        {
          phones: contacts,
        },
      );
      setUsers(response.data.users);
      // console.log(response.data.users);
    } catch (error) {
      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  }

  const filteredUsers = users.filter(user => {
    const fullName = `${user.name} ${user.surname}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const sortedFilteredUsers = filteredUsers.sort((a, b) => {
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
      {filteredUsers.length === 0 &&
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
      <ScrollView>
        {sortedFilteredUsers.map(user => {
          const {name, surname, photoUri, phone, _id} = user;
          const fullName = `${name} ${surname}`;
          return (
            <TouchableOpacity style={styles.contact} key={_id}>
              <Image source={{uri: `${API}${photoUri}`}} style={styles.image} />
              <Text style={styles.fullName}>{fullName}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
