import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

type PrivateRouteProps = {
  authRole: string;
}

function isTokenExp(token: string) {
  const tokenData: any = jwt_decode(token);
  if (tokenData.exp * 1000 < Date.now()) {
    localStorage.removeItem("userSession");
    return true;
  }
  return false;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ authRole }) => {
  const userInfo = localStorage.getItem("userSession");
  if (userInfo == null || isTokenExp(JSON.parse(userInfo).token)) {
    return <Navigate to={"/login"} replace={true} />;
  } else {
    const role = JSON.parse(userInfo).userInfo.authorities[0].authority;
    return authRole === role
      ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
  }
}

export default PrivateRoute;