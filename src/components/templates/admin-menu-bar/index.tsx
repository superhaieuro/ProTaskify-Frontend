import MenuLogo from "../../atoms/menu-logo";
import UserInfoTab from "../../atoms/user-information-box";
import AdminMenuField from "../../organisms/admin-menu-field";

const AdminMenuBar = () => {
    return (
        <div className="w-80 p-5 bg-gray-50 border-r border-gray-200 h-screen gap-y-10 flex flex-col">
            <MenuLogo />
            <AdminMenuField />
            <div className="h-full flex items-end">
                <UserInfoTab />
            </div>
        </div>
    )
}

export default AdminMenuBar;