import { Outlet } from "react-router-dom";
import LecturerMenuBar from "../../templates/lecturer-menu-bar";

const Lecturer = () => {
    return (
        <div className="flex">
            <LecturerMenuBar />
            <div className="p-5">
                <Outlet />
            </div>
        </div>
    )
}

export default Lecturer;