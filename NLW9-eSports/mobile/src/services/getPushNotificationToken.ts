import * as Notification from "expo-notifications";

export async function getPushNotificationToken() {
  const { granted } = await Notification.getPermissionsAsync();

  if (!granted) {
    await Notification.requestPermissionsAsync();
  }

  if (granted) {
    const pushToken = await Notification.getExpoPushTokenAsync();
    return pushToken.data;
  }
}
