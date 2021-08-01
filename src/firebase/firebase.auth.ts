import { auth, fb } from "./firebase.config";

export const signinWithPopup = () => {
  return auth.signInWithPopup(new fb.auth.GoogleAuthProvider());
};
