import { Navigate } from "react-router-dom";
import LoginButton from "../../atoms/login-button"
import NotificationBox from "../../atoms/notification-box";

const Login = () => {
    const userInfo = sessionStorage.getItem("userSession");
    if (userInfo == null) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="w-80 flex items-center flex-col gap-y-5">
                    <div className="gap-y-2 text-center">
                        <div className="text-3xl font-bold">Login to ProTaskify</div>
                        <div className="text-sm text-gray-600">Organize courses, groups and projects with ease and efficiency.</div>
                    </div>
                    <LoginButton />
                    <NotificationBox icon="lightbulb" message="We suggest using the email address you use at your work." style="text-gray-600 border-gray-200 bg-gray-50" />
                </div>
            </div>
        );
    } else {
        return <Navigate to={
            JSON.parse(userInfo).userInfo.authorities[0].authority === "LECTURER" ? "/lecturer" : "/student"
        } replace={true} />;
    }
}

export default Login;