import * as React from "react";
import { Alert, View } from "react-native";
import { TextInput, Appbar, Button } from "react-native-paper";
import { auth } from "../firebase.conf";
import SignInModal from "../components/SignInModal";
import store from "../redux-store/userSlice";

/**
 * Sign in Screen
 * Opens a modal to sign up
 */
export default function SignInScreen({ navigation }) {
    const [email, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    function userLogin() {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate("Home");
                auth.onAuthStateChanged((user) => {
                    if (user) store.dispatch({ type: "login", payload: user });
                    else store.dispatch({ type: "logout" });
                });
            })
            .catch((err) => Alert.alert(err.message));
    }

    function userSignUp() {
        setVisible(true);
    }

    return (
        <View>
            <TextInput
                label="Email"
                text={email}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                label="Password"
                text={password}
                secureTextEntry
                autoCompleteType="password"
                onChangeText={(text) => setPassword(text)}
            />
            <Button onPress={userLogin}>Submit</Button>
            <Button onPress={userSignUp}>Sign up</Button>
            <SignInModal visible={visible} />
        </View>
    );
}
