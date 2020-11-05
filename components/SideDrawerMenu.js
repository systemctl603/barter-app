import React from "react";
import { DrawerItems } from "react-navigation-drawer";
import { Button, View } from "react-native";
import { auth } from "../firebase.conf";

export default function SideDrawerMenu(props) {
  return (
    <>
      <DrawerItems {...props} />
      <View style={{ marginTop: "auto" }}>
        <Button
          title="Logout"
          onPress={() => {
            props.navigation.navigate("Sign In");
            auth.signOut();
          }}
        />
      </View>
    </>
  );
}
