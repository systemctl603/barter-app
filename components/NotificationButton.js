import * as React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { auth, db } from "../firebase.conf";

export default function NotificationButton(props) {
    const [numnotifs, setNumnotifs] = useState(0);

    React.useEffect(() => {
        console.log("ran")
        db
            .collection("notifications")
            .where("to", "==", auth.currentUser.email)
            .where("read", "==", false)
            .onSnapshot((doc) => setNumnotifs(doc.size))
    }, [])

    return (
        <View>
            <Button onPress={props.onPress}>{numnotifs}</Button>
        </View>
    )
}