import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDM_wLsQib1OPmkEPkVgY20zWYY_ssx6j0",
  authDomain: "xcel-med-connect.firebaseapp.com",
  projectId: "xcel-med-connect",
  storageBucket: "xcel-med-connect.appspot.com",
  messagingSenderId: "233135450683",
  appId: "1:233135450683:web:ae728e32242fae5831ca1e",
  measurementId: "G-HYPDQ08CWT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
