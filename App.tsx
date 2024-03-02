import {View, StyleSheet} from 'react-native';
import React from 'react';
import Login from './src/screens/Login/login.screen';

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
