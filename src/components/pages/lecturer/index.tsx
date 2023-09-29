import { Outlet } from "react-router-dom";
import LecturerMenuBar from "../../templates/lecturer-menu-bar";
import DemoApphehe from "../../demo";

const Lecturer = () => {
    return (
        <div className="flex">
            <LecturerMenuBar />
            <DemoApphehe />
            <div className="p-5">
                <Outlet />
            </div>
        </div>
    )
}

export default Lecturer;