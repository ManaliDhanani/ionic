import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'New App',
  webDir: 'www',
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["facebook.com"],
    },
    Share: {
      enabled: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    FirebaseAnalytics: {
      collectionEnabled: true,
      screenNameTracking: true,
      enabled: true
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '149263745013-sm102vf9deuj39gmiateq175u85t5pv7.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
