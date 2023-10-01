import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
  authRole: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ authRole }) => {
  const userInfo = sessionStorage.getItem("userSession");
  if (userInfo == null) {
    return <Navigate to={"/"} replace={true} />;
  } else if (JSON.parse(userInfo).userInfo.authorities[0].authority === authRole) {
    return <Outlet />;
  }
}

export default PrivateRoute;