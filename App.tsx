import {View, StyleSheet} from 'react-native';
import React from 'react';
import Login from './src/screens/Login/login.screen';
import Verify from './src/screens/Verify/verify.screen';
import AuthStack from './src/navigation/AuthStack/auth.stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext/auth.context';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <AuthStack />
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
