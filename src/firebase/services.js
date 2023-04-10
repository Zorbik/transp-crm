import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";

export const createUser = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const signInUser = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const signInUserWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    return user;
  } catch (error) {
    console.log("error:", error);
  }
};
