import { Outlet } from "react-router-dom";
import LecturerMenuBar from "../../templates/lecturer-menu-bar";

const Lecturer = () => {
    return (
        <div className="flex h-screen">
            <LecturerMenuBar />
            <div className="p-5 w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Lecturer;