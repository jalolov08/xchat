import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Chats from '../../screens/Chats/chat.screen';

const Stack = createNativeStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chats" component={Chats} />
    </Stack.Navigator>
  );
}
