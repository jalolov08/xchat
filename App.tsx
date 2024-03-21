import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext/auth.context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './src/navigation/index';
import {SocketProvider} from './src/contexts/SocketContext/socket.context';
const RootStack = createNativeStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SocketProvider>
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
