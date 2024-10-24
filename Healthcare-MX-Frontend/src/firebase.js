import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHgFY6xBYLwCbTspQUE0yrenRwwCNg8XA",
  authDomain: "mx-healthcare.firebaseapp.com",
  projectId: "mx-healthcare",
  storageBucket: "mx-healthcare.appspot.com",
  messagingSenderId: "1072730906845",
  appId: "1:1072730906845:web:44fb7aed92c3d49d9a7b34"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
