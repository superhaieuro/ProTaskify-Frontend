import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import NormalButton from "../../atoms/normal-button";
import HeaderTitle from "../../atoms/header-title";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/axios";
import { ClassInfoContext } from "../../../utils/class-info-context";

type Class = {
    id: number;
    name: string;
    studentList: any;
    groupList: any;
};

const LecturerClassDetail = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [classInfo, setClassInfo] = useState<Class>();

    const classIdContext = useContext(ClassInfoContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/v1/lecturer/get-class/${classId}`);
                setClassInfo(response.data);
                classIdContext?.setClassId(JSON.parse(JSON.stringify(response.data)).id);
            } catch (error) {
                console.log(error);
                navigate("/lecturer/classes");
            }
        }
        fetchUserData();
    }, []);

    if (classInfo) {
        return (
            <div className="flex flex-col gap-5">
                <button className="w-fit" onClick={() => navigate("/lecturer")}>
                    <NormalButton icon="arrow_back" message="Back to classes" />
                </button>

                <HeaderTitle title={classInfo!.name} subTitle="Manage your class here." />

                <div className="flex flex-col gap-5">
                    <div className="sub-menu">
                        <NavLink to={"sprintlist"}>
                            Sprints
                        </NavLink>

                        <NavLink to={"studentlist"}>
                            Students
                        </NavLink>

                        <NavLink to={"grouplist"}>
                            Groups
                        </NavLink>
                    </div>

                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }
}

export default LecturerClassDetail;