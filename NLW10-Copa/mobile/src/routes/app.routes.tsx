import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";

// SCREENS
import { NewPool } from "../screens/NewPoll";
import { MyPools } from "../screens/MyPolls";
import { useTheme } from "native-base";
import { FindPool } from "../screens/FindPool";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: 87,
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },

        tabBarIconStyle: {
          position: "relative",
          top: Platform.OS === "android" ? 0 : 0,
        },

        tabBarLabelPosition: "beside-icon",
      }}
    >
      <Screen
        name="new_poll"
        component={NewPool}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "Novo bolão",
        }}
      />

      <Screen
        name="polls"
        component={MyPools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "Meus Bolões",
        }}
      />

      <Screen
        name="find_poll"
        component={FindPool}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
