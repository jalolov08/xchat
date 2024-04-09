import messaging from '@react-native-firebase/messaging';

export function registerNotificationListener(navigation) {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Message', JSON.stringify(remoteMessage));
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    navigation.navigate('Chat', {otherParticipant: remoteMessage.data});

    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        navigation.navigate('Chat', {otherParticipant: remoteMessage.data});

        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}
