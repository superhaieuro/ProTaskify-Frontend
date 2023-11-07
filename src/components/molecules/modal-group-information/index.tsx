import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import api from "../../../config/axios";
import { ClassInfoContext } from "../../../utils/class-info-context";
import FeatureBoardItemBox from "../../atoms/feature-board-item-box";
import TaskBoardItemBox from "../../atoms/task-board-item-box";
import StatusBox from "../../atoms/status-box";
import TextareaAutosize from 'react-textarea-autosize';
import ApproveButton from "../../atoms/approve-button";
import { ToastContext } from "../../../utils/toast-context";
import RejectButton from "../../atoms/reject-button";
import ModalAlert from "../modal-alert";

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

const ModalGroupInformation: FC<ModalGroupInformationProps> = ({ isVisible, onClose, group }) => {
    const [taskList, setTaskList] = useState<Tasks[]>([]);
    const [sprintList, setSprintList] = useState<Sprint[]>([]);
    const [tempSprint, setTempSprint] = useState<Sprint | null>(null);
    const [inputFeedback, setInputFeedback] = useState<string | null>(null);
    const [showAlertModal, setShowAlertModal] = useState(false);

    const [expandTask, setExpandTask] = useState(false);
    const [expandTaskIcon, setExpandTaskIcon] = useState("expand_more")

    const [expandFeature, setExpandFeature] = useState(false);
    const [expandFeatureIcon, setExpandFeatureIcon] = useState("expand_more")

    const classId = useContext(ClassInfoContext);

    const handleExpandTask = () => {
        expandTask ? setExpandTask(false) : setExpandTask(true);
        expandTaskIcon === "expand_more" ? setExpandTaskIcon("expand_less") : setExpandTaskIcon("expand_more");
    }

    const handleExpandFeature = () => {
        expandFeature ? setExpandFeature(false) : setExpandFeature(true);
        expandFeatureIcon === "expand_more" ? setExpandFeatureIcon("expand_less") : setExpandFeatureIcon("expand_more");
    }

    useEffect(() => {
        setTempSprint(sprintList.filter(sprintItem => new Date(sprintItem.endDate) > new Date())[0]);
    }, [sprintList])

    useEffect(() => {
        setInputFeedback(group?.feedbackList.find(fb => fb.sprint.id === tempSprint!.id)?.feedback ?? "")
    }, [tempSprint])

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const lecturerId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const taskData = await api.get(`/api/v1/common/view-all-task-of-group?userId=${lecturerId}&role=STUDENT&role=LECTURER&classId=${classId?.classId}&groupId=${group?.id}`);
                const sprintData = await api.get(`/api/v1/common/view-sprint/${classId!.classId}`);
                setSprintList(sprintData.data);

                const sortedTaskList = JSON.parse(JSON.stringify(taskData.data)).sort((a: Tasks, b: Tasks) => {
                    const featureNameA = group?.featureList.find(feature =>
                        feature.taskList.some(task => task.id === a.id))?.name ?? "No feature";

                    const featureNameB = group?.featureList.find(feature =>
                        feature.taskList.some(task => task.id === b.id))?.name ?? "No feature";

                    return featureNameA.localeCompare(featureNameB);
                });

                setTaskList(sortedTaskList);
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [group])

    const toast = useContext(ToastContext);

    const handleSendFeedback = (sprintItem: Sprint) => {
        try {
            const fetchUserData = async () => {
                let response;
                const feedbackId = group?.feedbackList.find(fb => fb.sprint.id === sprintItem.id)?.id;
                if (feedbackId) {
                    response = await api.put(`/api/v1/lecturer/update-feedback?groupId=${group?.id}&feedbackId=${feedbackId}&feedbackText=${inputFeedback}`, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });
                } else {
                    response = await api.post(`/api/v1/lecturer/create-feedback?sprintId=${tempSprint?.id}&groupId=${group?.id}&feedbackText=${inputFeedback}`, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });
                }

                if (response.status === 200) {
                    // toast?.setSuccessMessage("Create feature successfully.");
                    window.location.reload();
                } else {
                    toast?.setErrorMessage("Failed to send data.");
                }
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = () => {
        try {
            const fetchUserData = async () => {
                const response = await api.delete(`/api/v1/lecturer/delete-group?groupId=${group?.id}&classId=${classId?.classId}`, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
                if (response.status === 200) {
                    // toast?.setSuccessMessage("Create feature successfully.");
                    window.location.reload();
                } else {
                    toast?.setErrorMessage("Failed to send data.");
                }
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center py-10">
                <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col gap-y-5 max-h-full animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Group information</div>
                        <button onClick={() => {
                            onClose();
                            // setInputFeedback(null);
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="flex gap-5 max-h-full overflow-auto">
                        <div className="flex flex-col gap-5 max-w-2xl">
                            <div className="flex w-full justify-between items-center border border-gray-200 rounded-lg p-5 bg-gray-50">
                                <div className="text-xl font-bold">{group?.name}</div>
                                <button onClick={() => setShowAlertModal(true)}>
                                    <RejectButton icon="" message="Delete this group" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 text-sm">
                                {/* <div className="font-semibold">Student list</div> */}
                                <div className="border border-gray-200 rounded-lg overflow-auto">
                                    <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                                        <div className="w-10">#</div>
                                        <div className="w-28">Roll Number</div>
                                        <div className="w-72">Email</div>
                                        <div className="w-52">Full Name</div>
                                    </div>
                                    <div className="h-fit divide-y">
                                        {group?.studentList.map((student, index) => (
                                            <div key={index} className="p-5 flex gap-x-5 items-center">
                                                <div className="w-10">{index + 1}</div>
                                                <div className="w-28">{student.RollNumber}</div>
                                                <div className="w-72">{student.MemberCode}</div>
                                                <div className="w-52">
                                                    <div className="flex gap-1.5 items-center">
                                                        <img className="h-8 w-8 rounded-full" src={student.picture} alt="" />
                                                        {student.FullName}
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
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                                <div className="text-xs flex justify-between items-center text-gray-600">
                                    <div>Features board</div>
                                    <div className="flex gap-2 items-center">
                                        {group!.featureList.length}
                                        <span role="button" onClick={handleExpandFeature} className="material-symbols-rounded h-fit icon">{expandFeatureIcon}</span>
                                    </div>
                                </div>

                                {expandFeature ?
                                    <>
                                        {group?.featureList.map((featureItem) => (
                                            <div>
                                                <FeatureBoardItemBox
                                                    totalTask={featureItem.taskList.length}
                                                    doneTask={featureItem.taskList.filter(task => task.status === "Done").length}
                                                    title={featureItem.name}
                                                    startDate={new Date(featureItem.startDate)}
                                                    endDate={new Date(featureItem.endDate)} />
                                            </div>
                                        ))}
                                    </> : null}
                            </div>

                            <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                                <div className="text-xs flex justify-between items-center text-gray-600">
                                    <div>Tasks board</div>
                                    <div className="flex gap-2 items-center">
                                        {taskList.length}
                                        <span role="button" onClick={handleExpandTask} className="material-symbols-rounded h-fit icon">{expandTaskIcon}</span>
                                    </div>
                                </div>

                                {expandTask ?
                                    <>
                                        {
                                            taskList.map((taskItem) => (
                                                <div>
                                                    <TaskBoardItemBox
                                                        picture={taskItem.student.picture}
                                                        priority={taskItem.priority}
                                                        feature={group?.featureList.find(feature =>
                                                            feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                                        name={taskItem.name}
                                                        status={taskItem.status} />
                                                </div>
                                            ))
                                        }
                                    </> : null}
                            </div>
                        </div>

                        {sprintList.length != 0 ?
                            <div className="flex flex-col gap-5 max-h-full w-96 whitespace-pre-wrap">
                                {sprintList!.map((sprintItem) => (
                                    <div className="text-sm">
                                        <div className="flex gap-1.5 items-center">
                                            <div className="text-sm font-bold">{sprintItem.name}</div>
                                            {
                                                new Date(sprintItem.endDate) > new Date() ?
                                                    <StatusBox color="green" message="On-going" /> :
                                                    <StatusBox color="gray" message="Finished" />
                                            }
                                        </div>
                                        <div className="text-gray-600">{
                                            new Date(sprintItem.endDate) > new Date() ?
                                                <div className="mr-px mt-2 text-black">
                                                    <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600"
                                                        minRows={5} maxRows={10} value={inputFeedback!} onChange={(e) => { setInputFeedback(e.target.value) }} />
                                                    <div className="mt-5 w-full flex justify-end">
                                                        <button onClick={() => handleSendFeedback(sprintItem)}>
                                                            <ApproveButton icon="" message="Save" />
                                                        </button>
                                                    </div>
                                                </div> :
                                                group?.feedbackList.find(fb => fb.sprint.id === sprintItem.id)?.feedback ?? "No feedback is available yet."
                                        }</div>
                                    </div>
                                ))}
                            </div> : null}
                    </div>
                </div>

                <ModalAlert
                    isVisible={showAlertModal}
                    onClose={() => setShowAlertModal(false)} type={"warning"}
                    title="Warning"
                    description="Are you sure you want to delete this group?"
                    button={
                        <button onClick={handleDelete}>
                            <RejectButton icon="" message="Delete" />
                        </button>
                    } />
            </div>
        )
    }
}

export default ModalGroupInformation;