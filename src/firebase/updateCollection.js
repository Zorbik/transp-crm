import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";

export const updateCollection = async (collectionObject, collectionType) => {
  try {
    await addDoc(collection(db, collectionType), collectionObject);
  } catch (error) {
    console.log(error);
  }
};
