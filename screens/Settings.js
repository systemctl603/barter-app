import React, { useEffect, useState } from "react";
import { Card, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { ScrollView, Alert } from "react-native";
import { auth, db } from "../firebase.conf";
import store from "../redux-store/userSlice";

export default function Settings() {
  const [fields, setFields] = useState({});
  const [user, setUser] = useState({});
  store.subscribe(() => setUser(store.getState()));
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        setFields(doc.data());
      });
  }, []);
  return (
    <ScrollView>
      <Card>
        <Card.Title title="Name" />
        <Card.Content>
          <TextInput
            label="Name"
            value={fields.name || ""}
            autoCompleteType="name"
            onChangeText={(text) => setFields(...fields, { name: text })}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Phone" />
        <Card.Content>
          <TextInput
            label="Phone"
            keyboardType="number-pad"
            value={fields.phone || ""}
            onChangeText={(text) => setFields(...fields, { phone: text })}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Address" />
        <Card.Content>
          <TextInput
            label="Address"
            autoCompleteType="street-address"
            value={fields.address || ""}
            onChangeText={(text) => setFields(...fields, { address: text })}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Email" />
        <Card.Content>
          <TextInput
            label="Email"
            autoCompleteType="email"
            value={fields.email || ""}
            onChangeText={(text) => setFields(...fields, { email: text })}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Password" />
        <Card.Actions>
          <Button
            onPress={() => {
              auth
                .sendPasswordResetEmail(auth.currentUser.email)
                .then(() => Alert.alert("Sent!", "Check your email"))
                .catch(() => Alert.alert(`There was an error`));
            }}
          >
            Send password reset email
          </Button>
        </Card.Actions>
      </Card>

      <Button
        onPress={() => {
          db.collection("users").doc(user.uid).update(fields);
        }}
      >
        Update settings
      </Button>
    </ScrollView>
  );
}
