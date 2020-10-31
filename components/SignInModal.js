import React, { useState } from "react";
import { Modal } from "react-native";
import { TextInput, View, Button } from "react-native-paper";
import { db, auth } from "../firebase.conf"

export default function SignInModal(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmpassword, setCnfrmPassword] = useState("");
  return (
    <Modal visible={props.visisble}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        label="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Password"
        value={password}
        autoCompleteType="password"
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        value={cnfrmpassword}
        autoCompleteType="password"
        onChangeText={text => setCnfrmPassword(text)}
        secureTextEntry
      />

      <Button onPress={() => {
        auth.createUserWithEmailAndPassword(email, password)
          .then(user => {
            db.collection("users").doc(user.user.uid).set({
              name, phone, address, email
            })
          })
      }}>Submit</Button>
    </Modal>
  );
}
