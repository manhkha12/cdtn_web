import { messaging, VAPID_KEY } from "../firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { FcmApi } from "../repository/FcmApi";

export const NotificationService = {
  requestPermissionAndRegister: async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (token) {
          console.log('FCM Token:', token);
          // Đăng ký token với backend
          await FcmApi.registerToken({
            token,
            device_name: navigator.userAgent.split(') ')[0].split(' (')[1] || 'Web Browser',
            platform: 'web'
          });
          return token;
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('An error occurred while retrieving token:', error);
    }
  },

  onForegroundMessage: (callback: (payload: any) => void) => {
    return onMessage(messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      callback(payload);
    });
  }
};
