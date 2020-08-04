import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCBajZFNIgr1OGIDx26alCu1uHUt59rqcs",
  authDomain: "bmt-church.firebaseapp.com",
  databaseURL: "https://bmt-church.firebaseio.com",
  projectId: "bmt-church",
  storageBucket: "bmt-church.appspot.com",
  messagingSenderId: "157514309791",
  appId: "1:157514309791:web:11cd83ee242bc017d702aa",
  measurementId: "G-9BTTZFRH32",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// const db = firebase.database();
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
