import MenuLogo from "../../atoms/menu-logo";
import UserInfoTab from "../../atoms/user-info-box";
import StudentAccountField from "../../organisms/student-account-field";
import StudentMenuField from "../../organisms/student-menu-field";

const StudentMenuBar = () => {
    return (
        <div className="w-80 p-5 bg-gray-50 border-r border-gray-200 h-screen gap-y-10 flex flex-col">
            <MenuLogo />
            <StudentMenuField />
            <StudentAccountField />
            <div className="h-full flex items-end">
                <UserInfoTab />
            </div>
        </div>
    )
}

export default StudentMenuBar;