import { useEffect, useState } from "react";
import api from "../../../config/axios";
import SemesterList from "../../molecules/semester-list";
import HeaderTitle from "../../atoms/header-title";
import LecturerImportStudentList from "../lecturer-import-student-list";

const LecturerClassesManage = () => {
    const [semester, setSemester] = useState<any | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const lecturerEmail = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.MemberCode;
                const response = await api.get(`/api/v1/lecturer/get-lecturer-semester?lecturerEmail=${lecturerEmail}`);
                setSemester(JSON.stringify(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Classes" subTitle="Manage your classes and semester here." />
                <LecturerImportStudentList />
            </div>
            <SemesterList semester={semester}/>
        </div>
    )
}

export default LecturerClassesManage;