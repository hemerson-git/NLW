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
import { SignIn } from "./src/screens/SignIn";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { NewPool } from "./src/screens/NewPool";
import { FindPool } from "./src/screens/FindPool";
import { MyPools } from "./src/screens/MyPools";

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

        {!fontsLoaded ? <Loading /> : <SignIn />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
