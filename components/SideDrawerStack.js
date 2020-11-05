import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import SideDrawerMenu from "./SideDrawerMenu"

const Drawer = createDrawerNavigator();

export default function SideDrawerStack() {
  return (
    <Drawer.Navigator drawerContent={SideDrawerMenu}>
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  )
}
