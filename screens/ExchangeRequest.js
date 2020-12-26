import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { db, auth } from "../firebase.conf";

export default function ExchangeRequest() {
    const [name, setName] = useState("");
    const [object, setObject] = useState("");
    return (
        <KeyboardAvoidingView>
            <TextInput
                label="Name of object"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Object wanted for this"
                value={object}
                onChangeText={text => setObject(text)}
            />
            <Button
                onPress={() => {
                    db.collection("trades").doc("asdf").set({
                        name: name,
                        object: object,
                        initiator: auth.currentUser.email,
                        interested: null,
                        fulfillment: 0,
                    });
                }}
            >
                Submit
            </Button>
        </KeyboardAvoidingView>
    );
}
