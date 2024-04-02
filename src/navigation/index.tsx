import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabBar/TabBar';
import AuthStack from './AuthStack/auth.stack';
import {useAuth} from '../contexts/AuthContext/auth.context';
import ChangeProfile from '../screens/ChangeProfile/changeProfile.screen';
import Login from '../screens/Login/login.screen';
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
      <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
