import { useContext, useEffect, useState } from "react";
import { ClassInfoContext } from "../../../utils/class-info-context";
import api from "../../../config/axios";
import StatusBox from "../../atoms/status-box";
import NormalButton from "../../atoms/normal-button";
import ModalGroupInformation from "../../molecules/modal-group-information";
import ModalLecturerCreateGroup from "../../molecules/modal-lecturer-create-group";
import NullTableCell from "../../atoms/null-table-cell";

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
}

type Group = {
    id: string;
    name: string;
    project: Project;
    score: string;
    studentList: Student[];
    featureList: Feature[];
    feedbackList: Feedback[];
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

type Sprint = {
    id: string;
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
}

type Feedback = {
    id: string;
    feedback: string;
    sprint: Sprint;
}

const LecturerClassGroupList = () => {
    const classIdContext = useContext(ClassInfoContext);
    const [classInfo, setClassInfo] = useState<Class>();
    const [tempGroup, setTempGroup] = useState<Group | undefined>();
    const [showModalGroupInformation, setShowGroupInformation] = useState(false);
    const [showModalCreateGroup, setShowModalCreateGroup] = useState(false);

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
        <div className="flex flex-col gap-5">
            <div className="w-full flex justify-end">
                <button onClick={() => setShowModalCreateGroup(true)}>
                    <NormalButton icon="add" message="Create new group" />
                </button>
            </div>

            <ModalLecturerCreateGroup
                isVisible={showModalCreateGroup}
                onClose={() => setShowModalCreateGroup(false)}
                classes={classInfo!} />

            <div className="flex flex-col gap-2 text-sm">
                <div className="border border-gray-200 rounded-lg overflow-auto">
                    <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                        <div className="w-10">#</div>
                        <div className="w-60">Group name</div>
                        <div className="w-1/2">Project</div>
                        <div className="w-36">Members</div>
                    </div>
                    {classInfo?.groupList.length != 0 ?
                        <div className="divide-y">
                            {classInfo?.groupList.map((groupItem, index) => (
                                <div key={index} className="p-5 flex gap-x-5 items-center">
                                    <div className="w-10 flex-shrink-0">{index + 1}</div>
                                    <div className="w-60 flex-shrink-0">{groupItem.name}</div>
                                    <div className="w-1/2 flex-shrink-0">{groupItem.project ?
                                        groupItem.project.name :
                                        <StatusBox color="red" message="No project" />}
                                    </div>
                                    <div className="w-36 flex-grow">{groupItem.studentList.length}</div>
                                    <button className="h-fit" onClick={() => {
                                        setTempGroup(groupItem);
                                        setShowGroupInformation(true);
                                    }}>
                                        <NormalButton icon="" message="View" />
                                    </button>
                                </div>
                            ))}
                        </div> :
                        <NullTableCell />}
                </div>

                <ModalGroupInformation
                    isVisible={showModalGroupInformation}
                    onClose={() => setShowGroupInformation(false)}
                    group={tempGroup} />
            </div>
        </div>
    )
}

export default LecturerClassGroupList;