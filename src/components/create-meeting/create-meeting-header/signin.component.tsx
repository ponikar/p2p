import React, { FC, memo, useCallback, useContext } from "react";
import { signinWithPopup } from "../../../firebase/firebase.auth";
import { PrimaryButton } from "../../common/button.component";
import { ToastContext } from "../../common/toast/toast.context";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.selectors";
import { auth } from "../../../firebase/firebase.config";
export const Signin: FC = memo(() => {
  const { setToastProps } = useContext(ToastContext);
  const { uid, displayName } = useSelector(selectUser);
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

  return (
    <section>
      {uid ? (
        <div className="center">
          <div>
            <img
              src="https://robohash.org/logo"
              alt="P2P user"
              className="w-12 h-12 ml-2 rounded-full"
            />
          </div>
          <div className="flex flex-col mt-2 mx-2 items-start">
            <h2 className="text-base"> {displayName} </h2>
            <button
              onClick={() => auth.signOut()}
              className="text-sm text-primary"
            >
              {" "}
              Signout{" "}
            </button>
          </div>
        </div>
      ) : (
        <PrimaryButton onClick={singin}> Signin with Google </PrimaryButton>
      )}
    </section>
  );
});
