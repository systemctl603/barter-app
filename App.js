import * as React from "react";
import { StyleSheet, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import unused from "app";

export default function App() {
  return (
    <View style={styles.container}>
      <SignInScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
