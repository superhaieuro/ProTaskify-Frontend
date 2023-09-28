import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
  authRole: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ authRole }) => {
  const userInfo = localStorage.getItem("userSession");
  if (userInfo == null) {
    return <Navigate to={"/login"} replace={true} />;
  } else {
    const role = JSON.parse(userInfo).role;
    return authRole === role
      ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
  }
}

export default PrivateRoute;
