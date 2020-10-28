import * as React from "react";
import { AccessibilityInfo, Alert, View } from "react-native";
import { TextInput, Appbar, Button } from "react-native-paper";
import { auth } from "../firebase.conf";
import SignInModal from "../components/SignInModal"

/**
 * Sign in Screen
 * Opens a modal to sign up
 */
export default function SignInScreen() {
  const [email, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  function userLogin() {
    auth.signInWithEmailAndPassword(email, password)
      .catch((err) => Alert.alert(err.message));
  }

  function userSignUp() {
    setVisible(true)
  }

  return (
    <View>
      <Appbar>
        <Appbar.Content title="Sign in" />
      </Appbar>
      <TextInput
        label="Email"
        text={email}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        label="Password"
        text={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={userLogin}>Submit</Button>
      <Button onPress={userSignUp}>Sign up</Button>
      <SignInModal visible={visible} />
    </View>
  );
}
