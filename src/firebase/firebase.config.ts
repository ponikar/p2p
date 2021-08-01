import fb from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import firebaseConfig from "./firebase.config.json"

if (!fb.apps.length) {
  fb.initializeApp(firebaseConfig);
}

const db = fb.firestore();

const auth = fb.auth();
export { fb, db, auth };
