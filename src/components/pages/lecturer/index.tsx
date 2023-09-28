import { Outlet } from "react-router-dom";
import LecturerMenuBar from "../../templates/lecturer-menu-bar";

const Lecturer = () => {
    return (
        <div className="flex">
            <LecturerMenuBar />
            <Outlet />
        </div>
            
    )
}

export default Lecturer;