import * as React from "react";
import SignInScreen from "./screens/SignInScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SideDrawerStack from "./components/SideDrawerStack";
import Nav from "./services/nav"
import NotificationButton from "./components/NotificationButton";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer ref={navRef => Nav.setContainer(navRef)}>
            <Stack.Navigator>
                <Stack.Screen name="Sign in" component={SignInScreen} />
                <Stack.Screen
                    name="Home"
                    component={SideDrawerStack}
                    options={({ navigation }) => ({
                        headerRight: () => <NotificationButton onPress={() => {
                            navigation.navigate("Notifications")
                        }} />
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
