import { useEffect, useState } from "react";
import api from "../../../config/axios";
import StatusBox from "../../atoms/status-box";
import NormalButton from "../../atoms/normal-button";
import ModalEditSemester from "../../molecules/modal-edit-semester";

type Semester = {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    classesList: Class[];
    status: boolean;
}

type Class = {
    id: string;
}

const AdminSemesterList = () => {
    const [semesterList, setSemesterList] = useState<Semester[]>([]);
    const [tempSemester, setTempSemester] = useState<Semester | undefined>();
    const [showModalEditSemester, setShowModalEditSemester] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get("/api/v1/admin/view-all-semesters");
                setSemesterList(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div className="border border-gray-200 rounded-lg overflow-auto whitespace-pre-wrap text-sm">
            <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                <div className="w-10">#</div>
                <div className="w-60">Name</div>
                <div className="w-56">Start date</div>
                <div className="w-56">End Date</div>
                <div className="w-56">Status</div>
                <div className="w-56">Classes</div>
            </div>
            <div className="divide-y">
                {semesterList.map((semesterItem, index) => (
                    <div key={index} className="p-5 flex gap-x-5 items-center">
                        <div className="w-10 flex-shrink-0 my-1.5 h-fit">{index + 1}</div>
                        <div className="w-60 flex-shrink-0 my-1.5 h-fit">
                            {semesterItem.name}
                        </div>
                        <div className="w-56 flex-shrink-0 my-1.5 h-fit">
                            {new Date(semesterItem.startDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                        </div>
                        <div className="w-56 flex-shrink-0 my-1.5 h-fit">
                            {new Date(semesterItem.endDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'

                            })}
                        </div>
                        <div className="w-56 flex-shrink-0 my-1.5 items-center flex h-5">
                            <StatusBox
                                color={new Date(semesterItem.startDate) > new Date() ? "yellow" : new Date(semesterItem.endDate) > new Date() ? "green" : "gray"}
                                message={new Date(semesterItem.startDate) > new Date() ? "Not start" : new Date(semesterItem.endDate) > new Date() ? "On-going" : "Finished"} />
                        </div>

                        <div className="w-56 mr-auto">{semesterItem.classesList.length}</div>

                        <button className="h-fit" onClick={() => {
                            setTempSemester(semesterItem);
                            setShowModalEditSemester(true);
                        }}>
                            {new Date(semesterItem.startDate) > new Date() ? <NormalButton icon="" message="Edit" /> : null}
                        </button>
                    </div>

                ))}
            </div>
            {tempSemester ? 
            <ModalEditSemester
            isVisible={showModalEditSemester}
            onClose={() => setShowModalEditSemester(false)}
            semester={tempSemester} /> : null}
        </div>
    )
}

export default AdminSemesterList;