import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Plugin app',
  webDir: 'www',
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
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
    },
    LocalNotifications: {},
    VideoRecorder: {
      camera: "back",
      previewFrames: []
    },
    LiveUpdate: {
      appId: "ca5644a6-9b83-4987-ae21-09060784ba34",
      // autoDeleteBundles: true,
    }
  }
};

export default config;
