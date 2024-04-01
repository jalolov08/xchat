import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Settings from '../../screens/Settings/settings.screen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
