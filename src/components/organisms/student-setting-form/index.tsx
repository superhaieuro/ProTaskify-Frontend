import { useContext, useState } from "react";
import InputText from "../../atoms/input-text";
import NotificationBox from "../../atoms/notification-box";
import ApproveButton from "../../atoms/approve-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

const StudentSettingForm = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userSession")!);
    const [inputSkill, setInputSkill] = useState(userInfo.userInfo.skills);
    const [inputFacebook, setInputFacebook] = useState(userInfo.userInfo.facebook);
    const [inputGitHub, setInputGitHub] = useState(userInfo.userInfo.github);

    const [inputSkillError, setInputSkillError] = useState("");
    const [inputFacebookError, setInputFacebookError] = useState("");
    const [inputGitHubError, setInputGitHubError] = useState("");

    const toast = useContext(ToastContext);

    const handleChange = () => {
        let valid = true;
        if (inputSkill && inputSkill.length > 100) {
            setInputSkillError("Skill must be below 100 characters.");
            valid = false;
        } else {
            setInputSkillError("");
        }
        
        if (inputGitHub && inputGitHub.length > 100) {
            setInputGitHubError("GitHub link must be below 100 characters.");
            valid = false;
        } else {
            setInputGitHubError("");
        }

        if (inputFacebook && inputFacebook.length > 100) {
            setInputFacebookError("Facebook link must be below 100 characters.");
            valid = false;
        } else {
            setInputFacebookError("");
        }

        if (valid === true) {
            try {
                const request = {
                    studentId: JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber,
                    facebook: inputFacebook,
                    github: inputGitHub,
                    skill: inputSkill
                }
                const fetchUserData = async () => {
                    const response = await api.put("/api/v1/student/update-student-info", request, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });
                    if (response.status === 200) {
                        // toast?.setSuccessMessage("Create class successfully.");
                        const updatedUserInfo = {
                            ...userInfo,
                            userInfo: response.data
                        }
                        sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                        window.location.reload();
                    } else {
                        toast?.setErrorMessage("Failed to send data.");
                    }
                }
                fetchUserData();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="w-1/3 flex flex-col items-center gap-5">
            <div className="flex gap-5 items-center">
                <img className="w-20 h-20 rounded-full" src={userInfo.userInfo.picture}></img>
                <div>
                    <div className="text-xxs font-bold text-gray-600">STUDENT</div>
                    <div className="text-2xl font-bold">{userInfo.userInfo.FullName}</div>
                    <div className="text-base text-gray-600">{userInfo.userInfo.MemberCode}</div>
                </div>
            </div>

            <div className="w-full">
                <InputText title="Skill" error={inputSkillError} onChange={(e) => setInputSkill(e.target.value)} placeholder="Java, C#, ReactJS,..." readonly={false} value={inputSkill} />
            </div>

            <div className="w-full">
                <InputText title="GitHub" error={inputGitHubError} onChange={(e) => setInputGitHub(e.target.value)} placeholder="github.com/uchiha_super_dev" readonly={false} value={inputGitHub} />
            </div>

            <div className="w-full">
                <InputText title="Facebook" error={inputFacebookError} onChange={(e) => setInputFacebook(e.target.value)} placeholder="facebook.com/uchiha_sasuke" readonly={false} value={inputFacebook} />
            </div>

            <div className="w-full">
                <NotificationBox icon="lightbulb" message="Add your GitHub and Facebook so everyone can contact with you." style="text-blue-600 border-blue-200 bg-blue-50" />
            </div>

            <div className="w-full flex justify-end">
                <button onClick={handleChange}>
                    <ApproveButton icon="" message="Save changes" />
                </button>
            </div>
        </div>
    )
}

export default StudentSettingForm;