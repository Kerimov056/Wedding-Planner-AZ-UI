import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.df3a332828624cd194a655ae872ccb11',
  appName: 'salaam-greetings-app',
  webDir: 'dist',
  server: {
    url: 'https://df3a3328-2862-4cd1-94a6-55ae872ccb11.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;