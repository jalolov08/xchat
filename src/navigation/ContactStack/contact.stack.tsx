import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Contacts from '../../screens/Contacts/contacts.screen';

const Stack = createNativeStackNavigator();

export default function ContactStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Contacts" component={Contacts} />
    </Stack.Navigator>
  );
}
