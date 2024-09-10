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
      screenNameTracking: true
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '149263745013-739o25mcje7chhaeqg3l2ibqfjbd8csn.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
