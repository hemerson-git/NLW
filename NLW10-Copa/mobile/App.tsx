import { StatusBar, NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";

// COMPONENTS
import { Loading } from "./src/components/Loading";

// PAGES
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        {!fontsLoaded ? <Loading /> : <Routes />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
