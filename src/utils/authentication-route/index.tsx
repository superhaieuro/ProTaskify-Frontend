import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const AuthenticationRoute = () => {
    const userInfo = localStorage.getItem("userSession");
    if (userInfo == null) {
        return <Navigate to={"/login"} replace={true} />;
    } else {
        // const token: any = jwt_decode(JSON.parse(userInfo).token);
        // if (token.exp * 1000 < Date.now()) {
        //     localStorage.removeItem("userSession");
        //     return <Navigate to={"/login"} replace={true} />;
        // } else {
        //     return <Navigate to={
        //         JSON.parse(userInfo).role === "LECTURER" ? "/lecturer" : "/student"
        //     } replace={true} />;
        // }
        return <Navigate to={
            JSON.parse(userInfo).role === "LECTURER" ? "/lecturer" : "/student"
        } replace={true} />;
    }
}

export default AuthenticationRoute;