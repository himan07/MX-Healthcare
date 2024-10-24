import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase";

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const siginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signoutUser = () => {
  return auth.signOut();
};
