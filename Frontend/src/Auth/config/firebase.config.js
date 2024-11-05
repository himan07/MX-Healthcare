import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGAX8WbjgtBWfVqMRhTvSvR5qhaJ7Nq6w",
  authDomain: "xcel-global-panel.firebaseapp.com",
  projectId: "xcel-global-panel",
  storageBucket: "xcel-global-panel.firebasestorage.app",
  messagingSenderId: "1055370309475",
  appId: "1:1055370309475:web:ebf2890d7fd584ae222d56",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
