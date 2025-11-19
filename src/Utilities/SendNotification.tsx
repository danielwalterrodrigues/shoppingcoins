import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    await messaging().registerDeviceForRemoteMessages();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
    });
  }
}