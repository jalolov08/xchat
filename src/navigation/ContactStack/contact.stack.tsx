import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Contacts from '../../screens/Contacts/contacts.screen';
import AboutContact from '../../screens/AboutContact/aboutContact.screen';
import EditContact from '../../screens/EditContact/editContact.screen';

const Stack = createNativeStackNavigator();

export default function ContactStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="AboutContact" component={AboutContact} />
      <Stack.Screen name="EditContact" component={EditContact} />
    </Stack.Navigator>
  );
}
