import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import api from "../../../config/axios";
import { ClassInfoContext } from "../../../utils/class-info-context";
import FeatureBoardItemBox from "../../atoms/feature-board-item-box";
import "./index.scss";
import TaskBoardItemBox from "../../atoms/task-board-item-box";

type ModalGroupInformationProps = {
    isVisible: boolean;
    onClose: () => void;
    group: Group | undefined;
}

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

const ModalGroupInformation: FC<ModalGroupInformationProps> = ({ isVisible, onClose, group }) => {
    const [featureList, setFeatureList] = useState<Feature[]>([]);
    const [taskList, setTaskList] = useState<Tasks[]>([]);

    const classId = useContext(ClassInfoContext);

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const lecturerId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const featureData = await api.get(`/api/v1/common/view-features?userId=${lecturerId}&role=LECTURER&classId=${classId?.classId}&groupId=${group?.id}`);
                const taskData = await api.get(`/api/v1/common/view-all-task-of-group?userId=${lecturerId}&role=STUDENT&role=LECTURER&classId=${classId?.classId}&groupId=${group?.id}`);
                setFeatureList(JSON.parse(JSON.stringify(featureData.data)));

                const sortedTaskList = JSON.parse(JSON.stringify(taskData.data)).sort((a: Tasks, b: Tasks) => {
                    const featureNameA = featureList.find(feature =>
                        feature.taskList.some(task => task.id === a.id))?.name ?? "No feature";

                    const featureNameB = featureList.find(feature =>
                        feature.taskList.some(task => task.id === b.id))?.name ?? "No feature";

                    return featureNameA.localeCompare(featureNameB);
                });

                setTaskList(sortedTaskList);
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center">
                <div className="bg-white w-1/2 p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col gap-y-5 h-5/6">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Task information</div>
                        <button onClick={() => {
                            onClose();
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 overflow-auto">
                        <div className="flex flex-col gap-2 text-sm">
                            {/* <div className="font-semibold">Student list</div> */}
                            <div className="border border-gray-200 rounded-lg overflow-auto">
                                <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                                    <div className="w-10">#</div>
                                    <div className="w-28">Roll Number</div>
                                    <div className="w-72">Email</div>
                                    <div className="w-52">Full Name</div>
                                </div>
                                <div className="max-h-80 overflow-y-auto divide-y">
                                    {group?.studentList.map((student, index) => (
                                        <div key={index} className="p-5 flex gap-x-5">
                                            <div className="w-10">{index + 1}</div>
                                            <div className="w-28">{student.RollNumber}</div>
                                            <div className="w-72">{student.MemberCode}</div>
                                            <div className="w-52">{student.FullName}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                            <div className="text-xs flex justify-between text-gray-600">
                                <div>Features board</div>
                                <div>{featureList.length}</div>
                            </div>

                            {featureList.map((featureItem) => (
                                <div>
                                    <FeatureBoardItemBox
                                        totalTask={featureItem.taskList.length}
                                        doneTask={featureItem.taskList.filter(task => task.status === "Done").length}
                                        title={featureItem.name}
                                        startDate={new Date(featureItem.startDate)}
                                        endDate={new Date(featureItem.endDate)} />
                                </div>
                            ))}
                        </div>

                        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                            <div className="text-xs flex justify-between text-gray-600">
                                <div>Tasks board</div>
                                <div>{taskList.length}</div>
                            </div>

                            {taskList.map((taskItem) => (
                                <div>
                                    <TaskBoardItemBox
                                        picture={taskItem.student.picture}
                                        priority={taskItem.priority}
                                        feature={featureList.find(feature =>
                                            feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                        name={taskItem.name}
                                        status={taskItem.status} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalGroupInformation;