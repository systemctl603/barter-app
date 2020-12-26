import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import Settings from "../screens/Settings";
import Notifications from "../screens/Notifications";

const Drawer = createDrawerNavigator();

export default function SideDrawerStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Notifications" component={Notifications} />
        </Drawer.Navigator>
    );
}
