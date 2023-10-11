import { NavLink, Outlet } from "react-router-dom";
import HeaderTitle from "../../atoms/header-title";

const StudentBacklog = () => {
    return (
        <div className="flex flex-col gap-10">
            <HeaderTitle title="Backlog" subTitle="Manage your backlog here." />

            <div>
                <div className="text-xl font-bold">Sprint 4</div>
                <div className="text-gray-600 flex gap-1.5 items-center">
                    <span className="material-symbols-rounded h-fit icon">calendar_today</span>
                    <div className="text-sm">
                        {new Date().toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}
                        {" - "}
                        {new Date().toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}
                    </div>
                </div>
            </div>

            <div className="text-xs flex bg-gray-50 rounded-lg w-fit text-gray-600 sub-menu">
                <NavLink to={"featuretask"}>
                    Feature & Task
                    <div></div>
                </NavLink>

                <NavLink to={"verifyrequest"}>
                    Verify Request
                    <div></div>
                </NavLink>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default StudentBacklog;