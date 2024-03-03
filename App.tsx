import { StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext/auth.context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './src/navigation/index';
const RootStack = createNativeStackNavigator();
export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
