import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

type PrivateRouteProps = {
  authRole: string;
}

const verifyToken = () => {
  const token = JSON.parse(localStorage.getItem("userSession")!).token;
  if (token == null) {
    return false;
  } else {
    const decodedToken: any = jwt_decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("userSession");
      return false;
    } else {
      return true;
    }
  }
}

const PrivateRoute: FC<PrivateRouteProps> = ({ authRole }) => {
  const userInfo = JSON.parse(localStorage.getItem("userSession")!);
  if (userInfo == null) {
    return <Navigate to={"/"} replace={true} />;
  } else {
    const role = userInfo.role;
    return authRole === role && verifyToken() != null
      ? <Outlet /> : <Navigate to={"/"} replace={true} />;
  }
}

export default PrivateRoute;
