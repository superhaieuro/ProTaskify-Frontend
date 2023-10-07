import MenuLogo from "../../atoms/menu-logo";
import UserInfoTab from "../../atoms/user-info-box";
import LecturerAccountField from "../../organisms/lecturer-account-field";
import LecturerMenuField from "../../organisms/lecturer-menu-field";

const LecturerMenuBar = () => {
    return (
        <div className="w-80 p-5 bg-gray-50 border-r border-gray-200 h-screen gap-y-10 flex flex-col">
            <MenuLogo />
            <LecturerMenuField />
            <LecturerAccountField />
            <div className="h-full flex items-end">
                <UserInfoTab />
            </div>
        </div>
    )
}

export default LecturerMenuBar;