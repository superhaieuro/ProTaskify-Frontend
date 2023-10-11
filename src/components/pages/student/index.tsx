import { Outlet } from "react-router-dom";
import StudentMenuBar from "../../templates/student-menu-bar";

const Student = () => {
    return (
        <div className="flex h-screen">
            <StudentMenuBar />
            <div className="p-5 w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Student;