import { useEffect, useRef, useState } from "react";
import * as Notification from "expo-notifications";
import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Subscription } from "expo-modules-core";

import { THEME } from "./src/theme/index";
import { Loading } from "./src/components/Loading";
import { Background } from "./src/components/Background";
import { Routes } from "./src/routes";

import "./src/services/notificationConfigs";
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    (async () => {
      const token = await getPushNotificationToken();
      console.log(token);
    })();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notification.addNotificationReceivedListener((notification) => {});

    responseNotificationListener.current =
      Notification.addNotificationResponseReceivedListener((response) => {});

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notification.removeNotificationSubscription(
          getNotificationListener.current
        );

        Notification.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  if (!fontsLoaded) {
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
        backgroundColor="transparent"
      />

      <Routes />
    </NativeBaseProvider>
  );
}
