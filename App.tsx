import {
  BackHandler,
  AppState,
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext/auth.context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './src/navigation/index';
import {SocketProvider} from './src/contexts/SocketContext/socket.context';
import {ThemeProvider} from './src/contexts/ThemeContext/theme.context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  enableSecureView,
  forbidAndroidShare,
} from 'react-native-prevent-screenshot-ios-android';
import {getFcmToken} from './src/utils/getFcmToken';
import {requestUserPermission} from './src/utils/requestUserPermission';
import {registerNotificationListener} from './src/utils/notificationListner';
import SplashScreen from './src/ui/SplashScreen/splashscreen.ui';

const RootStack = createNativeStackNavigator();

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const checkApplicationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (error) {
        }
      }
    };
    checkApplicationPermission()
    getFcmToken();
    requestUserPermission();
    if (Platform.OS === 'android') {
      forbidAndroidShare();
    }
    if (Platform.OS == 'ios') {
      enableSecureView();
    }
    handleAppStateChange();
    handleAuth();
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async () => {
    const appState = AppState.currentState;
    if (appState === 'active') {
      handleAuth();
    }
  };

  const handleAuth = async () => {
    const auth = await AsyncStorage.getItem('auth');

    if (auth === 'true') {
      const biometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });
      const {available} = await biometrics.isSensorAvailable();

      if (available) {
        const {success} = await biometrics.simplePrompt({
          promptMessage: 'Введите пароль',
        });

        if (success) {
        } else {
          BackHandler.exitApp();
        }
      }
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <GestureHandlerRootView>
            {isInitialized ? (
              <NavigationContainer>
                <AppContent />
              </NavigationContainer>
            ) : (
              <SplashScreen onAnimationFinish={() => setIsInitialized(true)} />
            )}
          </GestureHandlerRootView>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const navigation = useNavigation();

  useEffect(() => {
    registerNotificationListener(navigation);
  }, [navigation]);

  return <MainStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
