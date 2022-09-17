import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import { Game } from "../pages/Game";
import { Home } from "../pages/Home";

const Navigation = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigation.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Navigation.Screen name="home" component={Home} />
      <Navigation.Screen name="game" component={Game} />
    </Navigation.Navigator>
  );
}
