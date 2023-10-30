import { useContext, useEffect, useState } from "react";
import { ClassInfoContext } from "../../../utils/class-info-context";
import api from "../../../config/axios";
import StatusBox from "../../atoms/status-box";
import NormalButton from "../../atoms/normal-button";
import ModalEditStudent from "../../molecules/modal-edit-student";

type Class = {
    id: number;
    name: string;
    studentList: Student[];
    groupList: Group[];
};

type Feature = {
    id: string,
    name: string,
    description: string,
    status: boolean,
    startDate: Date,
    endDate: Date
    taskList: Tasks[]
}

type Tasks = {
    id: string,
    name: string,
    status: string,
    feedback: string,
    priority: string,
    description: string,
    createDate: Date,
    finishDate: Date,
    taskIndex: number,
    feature: Feature,
    student: Student
}

type Student = {
    RollNumber: string;
    FullName: string;
    picture: string;
    MemberCode: string;
    status: boolean;
    leader: boolean;
    score: number;
}

type Group = {
    id: string;
    name: string;
    project: Project;
    score: string;
    studentList: Student[];
}

type Project = {
    id: string;
    name: string;
    problems: string;
    context: string;
    actors: string;
    functionalRequirements: string,
    nonFunctionalRequirements: string;
}

const LecturerClassStudentList = () => {
    const classIdContext = useContext(ClassInfoContext);
    const [classInfo, setClassInfo] = useState<Class>();
    const [showModalEditStudent, setShowModalEditStudent] = useState(false);
    const [tempStudent, setTempStudent] = useState<Student | undefined>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/v1/lecturer/get-class/${classIdContext!.classId}`);
                setClassInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col gap-2 text-sm">
            <div className="border border-gray-200 rounded-lg overflow-auto">
                <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                    <div className="w-10">#</div>
                    <div className="w-28">Roll Number</div>
                    <div className="w-72">Email</div>
                    <div className="w-60">Full Name</div>
                    <div className="w-60">Group</div>
                    <div className="w-36">Status</div>
                    <div className="w-36">Score</div>
                </div>
                <div className="divide-y">
                    {classInfo?.studentList.map((student, index) => (
                        <div key={index} className="p-5 flex gap-x-5 items-center">
                            <div className="w-10">{index + 1}</div>
                            <div className="w-28">{student.RollNumber}</div>
                            <div className="w-72">{student.MemberCode}</div>
                            <div className="w-60 flex gap-1.5">{student.FullName}
                                {student.leader ?
                                    <div className="text-xs font-bold text-yellow-600 flex items-center gap-0.5">
                                        <span className="material-symbols-rounded icon">
                                            stars
                                        </span>
                                        {/* <p>LEADER</p> */}
                                    </div>
                                    :
                                    null
                                }
                                </div>
                            <div className="w-60">
                                {classInfo.groupList.find(group =>
                                    group.studentList.some(st => st.RollNumber === student.RollNumber))?.name ??
                                    <StatusBox color="red" message="No group" />}
                            </div>
                            <div className="w-36">
                                <StatusBox color={student.status ? "green" : "red"} message={student.status ? "Enrolled" : "Not enrolled"} />
                            </div>
                            <div className="w-5 mr-auto">{
                                student.score != null ? student.score : "-"
                            }</div>

                            <button className="h-fit" onClick={() => {
                                setTempStudent(student);
                                setShowModalEditStudent(true);
                            }}>
                                <NormalButton icon="" message="Edit" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {classInfo && tempStudent ?
                <ModalEditStudent
                    isVisible={showModalEditStudent}
                    onClose={() => setShowModalEditStudent(false)}
                    groupList={classInfo!.groupList}
                    score={tempStudent?.score}
                    group={
                        classInfo!.groupList.find(group =>
                            group.studentList.some(st => st.RollNumber === tempStudent!.RollNumber))!
                    }
                    studentId={tempStudent.RollNumber}
                    leader={tempStudent.leader} />
                : null}
        </div>
    )
}

export default LecturerClassStudentList;