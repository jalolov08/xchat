import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Chats from '../../screens/Chats/chats.screen';
import Chat from '../../screens/Chat/chat.screen';

const Stack = createNativeStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
}
