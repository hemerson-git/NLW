import { useState } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { THEME } from "./src/theme/index";
import { Home } from "./src/pages/Home";
import { Loading } from "./src/components/Loading";
import { Background } from "./src/components/Background";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  if (fontsLoaded) {
    return (
      <NativeBaseProvider>
        <Background>
          <Loading />
        </Background>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#18181B"
      />
      <Home />
    </NativeBaseProvider>
  );
}
