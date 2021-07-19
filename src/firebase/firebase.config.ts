import fb from "firebase/app";
import "firebase/firestore"
import firebaseConfig from "./firebase.config.json"

if (!fb.apps.length) {
  fb.initializeApp(firebaseConfig);
}

const db = fb.firestore();
export { fb, db };
