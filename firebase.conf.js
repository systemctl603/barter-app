import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA4wX2uQRw6ey2ebt3paTrvxP3ekTK3ou0",
  authDomain: "book-santa-f4997.firebaseapp.com",
  databaseURL: "https://book-santa-f4997.firebaseio.com",
  projectId: "book-santa-f4997",
  storageBucket: "book-santa-f4997.appspot.com",
  messagingSenderId: "59409696675",
  appId: "1:59409696675:web:4ba1bd1138b23631bb7c16",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
