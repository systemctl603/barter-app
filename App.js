import * as React from "react";
import SignInScreen from "./screens/SignInScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SideDrawerStack from "./components/SideDrawerStack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign in" component={SignInScreen} />
        <Stack.Screen name="Home" component={SideDrawerStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
