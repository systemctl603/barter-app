import * as React from "react";
import { Alert, View } from "react-native";
import { TextInput, Appbar, Button } from "react-native-paper";
import { auth } from "../firebase.conf";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux-store/userSlice";
import SignInModal from "../components/SignInModal";

/**
 * Sign in Screen \
 * Opens a modal to sign up
 */
export default function SignInScreen({ navigation }) {
  const [email, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const dispatch = useDispatch();

  function userLogin() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        navigation.navigate("Home");
        auth.onAuthStateChanged((user) => {
          if (user) dispatch(login(user));
          else dispatch(logout());
        });
      })
      .catch((err) => Alert.alert(err.message));
  }

  function userSignUp() {
    setVisible(true);
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
