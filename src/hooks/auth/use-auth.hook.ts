import { useEffect } from "react";
import { auth } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../store/user/user.slices";
import { getAvatar } from "../../utils/member.util";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user)
        return dispatch(
          addUser({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            avatar: getAvatar(),
          })
        );
      dispatch(removeUser());
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
