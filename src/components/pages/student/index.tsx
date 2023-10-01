import { Outlet } from "react-router-dom";
import StudentMenuBar from "../../templates/student-menu-bar";

const Student = () => {
    return (
        <div className="flex">
            <StudentMenuBar />
            <div className="p-5 w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default Student;