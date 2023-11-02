import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
  authRole: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ authRole }) => {
  const userInfo = sessionStorage.getItem("userSession");
  if (userInfo == null || JSON.parse(userInfo).userInfo.authorities[0].authority !== authRole) {
    return <Navigate to={"/"} replace={true} />;
  } else if (JSON.parse(userInfo).userInfo.authorities[0].authority === authRole) {
    if (authRole === "STUDENT" && JSON.parse(userInfo!).inGroup === false || authRole === "STUDENT" && JSON.parse(userInfo!).groupStatus === false) {
      return <Navigate to={"/creategroup"} replace={true} />;
    } else {
      return <Outlet />;
    }
  }
};

export default PrivateRoute;