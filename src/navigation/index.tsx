import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabBar/TabBar';
import AuthStack from './AuthStack/auth.stack';
import {useAuth} from '../contexts/AuthContext/auth.context';
const Stack = createNativeStackNavigator();

export default function MainStack() {
  const {authState} = useAuth();
  const isAuth = authState?.authenticated || false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuth ? (
        <Stack.Screen name="Home" component={TabNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
