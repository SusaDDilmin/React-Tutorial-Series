import { useFonts } from 'expo-font';
// Stack - is a component that allows you to define a stack of screens in your app.
//Like when you create a page it's name whill shown above ...
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// This is to provide theme according to the color scheme(like dark or light)
import { Appearance } from 'react-native';

import { Colors } from '../constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{headerStyle : { backgroundColor : theme.headerBackground }, headerTintColor : theme.text  , headerShadowVisible : false }}>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="(coffee)" options={{ headerShown: false }} /> */}
      <Stack.Screen name='index' options={{ title : "Home" , headerShown: false }} /> 
      <Stack.Screen name='menu' options={{headerShown: true, title : "Menu" , headerTitle : "Coffee Shop Menu" }} />
      <Stack.Screen name='contact' options={{headerShown: true, title : "Contact" , headerTitle : "Contact Us" }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}
