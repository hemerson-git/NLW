import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import { theme } from "./src/theme";
import { useEffect } from "react";
import { Widget } from "./src/components/Widget";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    (async () => {
      if (!fontsLoaded) {
        preventAutoHideAsync();
        return;
      }

      hideAsync();
    })();
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
      <Widget />
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
