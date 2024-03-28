import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext/auth.context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './src/navigation/index';
import {SocketProvider} from './src/contexts/SocketContext/socket.context';
import {ThemeProvider} from './src/contexts/ThemeContext/theme.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const RootStack = createNativeStackNavigator();
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
        <GestureHandlerRootView>
        <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </GestureHandlerRootView>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
