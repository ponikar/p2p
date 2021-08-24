import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router-dom";
import { selectUser } from "../../store/user/user.selectors";
import { Unauthorized } from "../errors/Unauthorized.component";
import { LoadingScreen } from "../loading/loading.component";

interface ProtectedRoutesProps extends RouteProps {}
export const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  component,
  ...rest
}) => {
  const Component = component;
  const { uid, isLoading } = useSelector(selectUser);

  const checkUser = useCallback(() => {
    if (isLoading) return <LoadingScreen />;

    if (uid) return <Component />;

    return <Unauthorized />;
  }, [uid, isLoading]);

  return <Route {...rest} render={checkUser} />;
};
