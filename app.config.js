import 'dotenv/config';

export default {
  expo: {
    name: "",
    slug: "CampusLink",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/logo.png",
      resizeMode: "contain",
      backgroundColor: "#3B82F6"
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
    unstable_settings: {
      navigationIndependentTree: true
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#3B82F6"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/logo.png"
    },
    plugins: [
      "expo-router"
    ]
  }
};
