import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBekRCxQbGkcrdS8HB-I6jezQbrWHr5Su8",
  authDomain: "barter-app-c4bad.firebaseapp.com",
  databaseURL: "https://barter-app-c4bad.firebaseio.com",
  projectId: "barter-app-c4bad",
  storageBucket: "barter-app-c4bad.appspot.com",
  messagingSenderId: "278913258887",
  appId: "1:278913258887:web:7bba258343881bba642f22"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
