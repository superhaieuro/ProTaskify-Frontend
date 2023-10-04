import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Navigate } from "react-router-dom";

const LoginButton = () => {
    const [role, setRole] = useState<string | null>(null);
    const [redirecting, setRedirecting] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);

    const handleLoginSuccess = (credentialResponse: any) => {
        const decodedCredential: any = credentialResponse.credential;
        setUserToken(decodedCredential);
    }

    useEffect(() => {
        if (userToken) {
            const fetchUserData = async () => {
                try {
                    const response = await api.post("/api/v1/auth", userToken);
                    const { token, userInfo } = response.data;
                    const userSessionData = { token, userInfo };
                    const userSession = JSON.stringify(userSessionData);
                    sessionStorage.setItem("userSession", userSession);
                    setRole(userSessionData.userInfo.authorities[0].authority);
                    setRedirecting(true);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchUserData();
        }
    }, [userToken]);

    if (redirecting) {
        return (
            <Navigate to={role === "LECTURER" ? "/lecturer" : "/student"} replace={true} />
        );
    }

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
                console.log("Login failed");
            }}
            theme="filled_blue"
            text="continue_with"
        />
    )
}

export default LoginButton;
