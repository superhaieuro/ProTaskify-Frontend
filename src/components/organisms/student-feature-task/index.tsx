import { useEffect, useState } from "react";
import DashedButton from "../../atoms/dashed-button";
import FeatureBoardItemBox from "../../atoms/feature-board-item-box";
import TaskBoardItemBox from "../../atoms/task-board-item-box";
import ModalCreateNewFeature from "../../molecules/modal-create-new-feature";
import ModalCreateNewTask from "../../molecules/modal-create-new-task";
import api from "../../../config/axios";
import ModalEditFeature from "../../molecules/modal-edit-feature";
import ModalEditTask from "../../molecules/modal-edit-task";
import SprintInformation from "../../molecules/sprint-information";
import LeaderRoute from "../../../utils/leader-route";

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
}

type Sprint = {
    id: string;
    name: string;
    note: string;
    feedbackList: Feedback[];
    startDate: Date;
    endDate: Date;
}

type Feedback = {
    feedback: string;
    sprint: Sprint;
}

type Group = {
    id: string;
    name: string;
    score: string;
    studentList: Student[];
    featureList: Feature[];
    feedbackList: Feedback[];
}

const StudentFeatureTask = () => {
    const [showCreateNewFeatureModal, setShowCreateNewFeatureModal] = useState(false);
    const [showCreateNewTaskModal, setShowCreateNewTaskModal] = useState(false);
    const [showEditFeatureModal, setShowEditFeatureModal] = useState(false);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [groupInfo, setGroupInfo] = useState<Group>();


    // const [featureList, setFeatureList] = useState<Feature[]>([]);
    const [taskList, setTaskList] = useState<Tasks[]>([]);
    const [tempFeature, setTempFeature] = useState<Feature | undefined>();
    const [tempTask, setTempTask] = useState<Tasks | undefined>();

    const leader = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.leader;

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const studentId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const groupData = await api.get(`/api/v1/common/get-group?userId=${studentId}&role=STUDENT`);
                if (groupData.status === 200) {
                    setGroupInfo(groupData.data);
                }
                // const featureData = await api.get(`/api/v1/common/view-features?userId=${studentId}&role=STUDENT`);
                // setFeatureList(JSON.parse(JSON.stringify(featureData.data)));

                const taskData = await api.get(`/api/v1/common/view-all-task-of-group?userId=${studentId}&role=STUDENT`);

                const sortedTaskList = JSON.parse(JSON.stringify(taskData.data)).sort((a: Tasks, b: Tasks) => {
                    const featureNameA = groupInfo?.featureList.find(feature =>
                        feature.taskList.some(task => task.id === a.id))?.name ?? "No feature";

                    const featureNameB = groupInfo?.featureList.find(feature =>
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

    return (
        <>
            {groupInfo ?
                <div className="flex flex-col gap-5">
                    <SprintInformation group={groupInfo!} />


                    <div className="flex gap-5">
                        <div className="w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                            <div className="text-xs flex justify-between text-gray-600">
                                <div>Features board</div>
                                <div>{groupInfo?.featureList.length}</div>
                            </div>

                            <LeaderRoute>
                                <button onClick={() => setShowCreateNewFeatureModal(true)}>
                                    <DashedButton
                                        icon="add"
                                        message="Create new feature" />
                                </button>
                            </LeaderRoute>

                            {groupInfo!.featureList.map((featureItem) => (
                                <div role="button" onClick={() => {
                                    setShowEditFeatureModal(true);
                                    setTempFeature(featureItem);
                                }}>
                                    <FeatureBoardItemBox
                                        totalTask={featureItem.taskList.length}
                                        doneTask={featureItem.taskList.filter(task => task.status === "Done").length}
                                        title={featureItem.name}
                                        startDate={new Date(featureItem.startDate)}
                                        endDate={new Date(featureItem.endDate)} />
                                </div>
                            ))}

                            <ModalCreateNewFeature
                                isVisible={showCreateNewFeatureModal}
                                onClose={() => setShowCreateNewFeatureModal(false)} />

                            <ModalEditFeature
                                isVisible={showEditFeatureModal}
                                onClose={() => setShowEditFeatureModal(false)}
                                feature={tempFeature} />
                        </div>

                        <div className="w-2/3 bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                            <div className="text-xs flex justify-between text-gray-600">
                                <div>Tasks board</div>
                                <div>{taskList.length}</div>
                            </div>

                            <LeaderRoute>
                                <button onClick={() => setShowCreateNewTaskModal(true)}>
                                    <DashedButton
                                        icon="add"
                                        message="Create new task" />
                                </button>
                            </LeaderRoute>

                            {taskList.map((taskItem) => (
                                <div role="button" onClick={() => {
                                    setShowEditTaskModal(true);
                                    setTempTask(taskItem);
                                    setTempFeature(groupInfo?.featureList.find(feature =>
                                        feature.taskList.some(task => task.id === taskItem.id)));
                                }}>
                                    <TaskBoardItemBox
                                        picture={taskItem.student.picture}
                                        priority={taskItem.priority}
                                        feature={groupInfo?.featureList.find(feature =>
                                            feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                        name={taskItem.name}
                                        status={taskItem.status} />
                                </div>
                            ))}

                            <ModalCreateNewTask
                                isVisible={showCreateNewTaskModal}
                                onClose={() => setShowCreateNewTaskModal(false)} />

                            {leader ?
                                <ModalEditTask
                                    isVisible={showEditTaskModal}
                                    onClose={() => setShowEditTaskModal(false)}
                                    task={tempTask}
                                    feature={tempFeature} /> : null}
                        </div>
                    </div>
                </div> : null}
        </>
    )
}

export default StudentFeatureTask;