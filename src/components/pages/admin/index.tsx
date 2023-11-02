import { Outlet } from "react-router-dom";
import AdminMenuBar from "../../templates/admin-menu-bar";

const Admin = () => {
    return (
        <div className="flex h-screen">
            <AdminMenuBar />
            <div className="p-5 w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;