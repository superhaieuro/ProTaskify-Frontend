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

const StudentFeatureTask = () => {
    const [showCreateNewFeatureModal, setShowCreateNewFeatureModal] = useState(false);
    const [showCreateNewTaskModal, setShowCreateNewTaskModal] = useState(false);
    const [showEditFeatureModal, setShowEditFeatureModal] = useState(false);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [featureList, setFeatureList] = useState<Feature[]>([]);
    const [taskList, setTaskList] = useState<Tasks[]>([]);
    const [tempFeature, setTempFeature] = useState<Feature | undefined>();
    const [tempTask, setTempTask] = useState<Tasks | undefined>();

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const studentId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const featureData = await api.get(`/api/v1/common/view-features?userId=${studentId}&role=STUDENT`);
                const taskData = await api.get(`/api/v1/common/view-all-task-of-group?userId=${studentId}&role=STUDENT`);
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

    return (
        <div className="flex flex-col gap-5">
            <SprintInformation />

            <div className="flex gap-5">
                <div className="w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                    <div className="text-xs flex justify-between text-gray-600">
                        <div>Features board</div>
                        <div>{featureList.length}</div>
                    </div>

                    <button onClick={() => setShowCreateNewFeatureModal(true)}>
                        <DashedButton
                            icon="add"
                            message="Create new feature" />
                    </button>

                    {featureList.map((featureItem) => (
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

                    <button onClick={() => setShowCreateNewTaskModal(true)}>
                        <DashedButton
                            icon="add"
                            message="Create new task" />
                    </button>

                    {taskList.map((taskItem) => (
                        <div role="button" onClick={() => {
                            setShowEditTaskModal(true);
                            setTempTask(taskItem);
                            setTempFeature(featureList.find(feature =>
                                feature.taskList.some(task => task.id === taskItem.id)));
                        }}>
                            <TaskBoardItemBox
                                picture={taskItem.student.picture}
                                priority={taskItem.priority}
                                feature={featureList.find(feature =>
                                    feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                name={taskItem.name}
                                status={taskItem.status} />
                        </div>
                    ))}

                    <ModalCreateNewTask
                        isVisible={showCreateNewTaskModal}
                        onClose={() => setShowCreateNewTaskModal(false)} />

                    <ModalEditTask
                        isVisible={showEditTaskModal}
                        onClose={() => setShowEditTaskModal(false)}
                        task={tempTask}
                        feature={tempFeature} />
                </div>
            </div>
        </div>
    )
}

export default StudentFeatureTask;