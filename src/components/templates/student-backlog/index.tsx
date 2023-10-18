import { NavLink, Outlet } from "react-router-dom";
import HeaderTitle from "../../atoms/header-title";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

const StudentBacklog = () => {
    const [name, setName] = useState<string | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const studentId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const response = await api.get(`/api/v1/student/sprint/${studentId}`);
                if (response.data != null) {
                    setName(response.data.name);
                    setStartDate(new Date(response.data.startDate));
                    setEndDate(new Date(response.data.endDate));
                }
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="flex flex-col gap-10">
            <HeaderTitle title="Backlog" subTitle="Manage your backlog here." />

            {name != null ?
                <div>
                    <div className="text-xl font-bold">{name}</div>
                    <div className="text-gray-600 flex gap-1.5 items-center">
                        <span className="material-symbols-rounded h-fit icon">calendar_today</span>
                        <div className="text-sm">
                            {startDate.toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                            {" - "}
                            {endDate.toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                        </div>
                    </div>
                </div> :
                null}

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