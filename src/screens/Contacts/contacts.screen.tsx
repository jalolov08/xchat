import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import styles from './contacts.style';
import Search from '../../ui/Search/search.ui';
import {getContacts} from '../../utils/getContacts';
import axios from 'axios';
import {API, API_BASE} from '../../../config';
import {TUser} from '../../types/user.type';

export default function ContactsScreen() {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<TUser[]>([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const contacts = await getContacts();
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

  async function syncContacts(contacts: any) {
    try {
      console.log(contacts);

      const response = await axios.post(`${API_BASE}/user/sync`, {
        phones: contacts,
      });
      setUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Контакты</Text>
      <Search containerStyle={{marginTop: 20}} />
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {error && <Text>{error}</Text>}
      <View>
        {users.map(user => {
          const {name, surname, photoUri, phone, _id} = user;
          const fullName = `${name} ${surname}`;
          return (
            <View style={styles.contact} key={_id}>
              <Image source={{uri: `${API}${photoUri}`}} style={styles.image} />
              <Text style={styles.fullName}>{fullName}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
