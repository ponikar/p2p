import React, { FC, memo, useCallback, useContext } from "react";
import { signinWithPopup } from "../../../firebase/firebase.auth";
import { PrimaryButton } from "../../common/button.component";
import { ToastContext } from "../../common/toast/toast.context";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.selectors";
export const Signin: FC = memo(() => {
  const { setToastProps } = useContext(ToastContext);
  const user = useSelector(selectUser);
  const singin = useCallback(async () => {
    try {
      await signinWithPopup();
    } catch (e) {
      setToastProps({
        show: true,
        text: "Something went wrong!",
        type: "danger",
      });
    }
  }, []);

  console.log(user);
  return (
    <section className="sm:block hidden">
      {/* <img
        src="https://robohash.org/logo"
        className="w-12 h-12 ml-2 rounded-full"
      /> */}
      <PrimaryButton onClick={singin}> Signin with Google </PrimaryButton>
    </section>
  );
});
