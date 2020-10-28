import React, { useState } from "react";
import { Modal } from "react-native";
import { TextInput, Text, Title, Button } from "react-native-paper";
import { db, auth } from "../firebase.conf"

const arrayOfFields = [
  "Name",
  "Number",
  "Address",
  "Email",
  "Password",
  "Confirm password",
];

export default function SignInModal(props) {
  const [fields, setFields] = useState({});
  return (
    <View>
      <Modal visible={props.visisble}>
        <Title>Sign Up</Title>
        {arrayOfFields.map((field) => (
          <TextInput
            label={field}
            value={fields[field] || ""}
            onChangeText={(text) => {
              var copy = fields;
              copy[field] = text;
              setFields(copy);
            }}
          />
        ))}
        <Button onPress={() => {
          auth.createUserWithEmailAndPassword(fields["Email"], fields["Password"])
            .then(user => {
              db.collection("users")
                .doc(user.uid)
                .set({ ...fields })
            })
        }}>Submit</Button>
      </Modal>
    </View>
  );
}
