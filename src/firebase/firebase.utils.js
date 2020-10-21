import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDo2OKSgedoQjFjVkfbEGNoyYaLSUYp6Vg",
  authDomain: "crown-db-8c545.firebaseapp.com",
  databaseURL: "https://crown-db-8c545.firebaseio.com",
  projectId: "crown-db-8c545",
  storageBucket: "crown-db-8c545.appspot.com",
  messagingSenderId: "691597592746",
  appId: "1:691597592746:web:cd173449464c908f3668d3",
  measurementId: "G-5B0E0DVLRS",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
