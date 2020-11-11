import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";

const Drawer = createDrawerNavigator();

export default function SideDrawerStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
}
