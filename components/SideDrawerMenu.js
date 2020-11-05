import React from "react";
import { DrawerItems } from "react-navigation-drawer";
import { Button, View } from "react-native";
import { auth } from "../firebase.conf";
import { useDispatch } from "react-redux";
import { logout } from "../redux-store/userSlice";

export default function SideDrawerMenu(props) {
  const dispatch = useDispatch();
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
