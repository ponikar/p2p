import { auth, fb } from "./firebase.config";

export const signinWithPopup = (): Promise<fb.auth.UserCredential> => {
  return auth.signInWithPopup(new fb.auth.GoogleAuthProvider());
};
