import LoginButton from "../../atoms/login-button"
import SuggestionBox from "../../atoms/suggestion-box";

const Login = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-80 flex items-center flex-col gap-y-5">
                <div className="gap-y-2 text-center">
                    <div className="text-3xl font-bold">Login to ProTaskify</div>
                    <div className="text-sm text-gray-600">Organize courses, groups and projects with ease and efficiency.</div>
                </div>
                <LoginButton />
                <SuggestionBox icon="lightbulb" message="We suggest using the email address you use at your work."/>
            </div>
        </div>
    );
}

export default Login;