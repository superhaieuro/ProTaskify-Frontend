import { NavLink, Outlet } from "react-router-dom";
import HeaderTitle from "../../atoms/header-title";

const StudentBacklog = () => {
    return (
        <div className="flex flex-col gap-10">
            <HeaderTitle title="Backlog" subTitle="Manage your backlog here." />

            <div className="flex flex-col gap-5">
                <div className="sub-menu">
                    <NavLink to={"featuretask"}>
                        Feature & Task
                    </NavLink>

                    <NavLink to={"verifyrequest"}>
                        Verify Request
                    </NavLink>
                </div>

                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StudentBacklog;