import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router-dom";
import { selectUser } from "../../store/user/user.selectors";

interface ProtectedRoutesProps extends RouteProps {}
export const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  component,
  ...rest
}) => {
  const Component = component;
  const { uid, isLoading } = useSelector(selectUser);

  const checkUser = useCallback(() => {
    if (isLoading) return <p> Hold on... </p>;

    if (uid) return <Component />;

    return <p> You are not Authorized! </p>;
  }, [uid, isLoading]);

  return <Route {...rest} render={checkUser} />;
};
