import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import InputDate from "../../atoms/input-date";
import TextareaAutosize from 'react-textarea-autosize';
import { ToastContext } from "../../../utils/toast-context";
import ApproveButton from "../../atoms/approve-button";
import RejectButton from "../../atoms/reject-button";
import TaskItemSubBox from "../../atoms/task-item-sub-box";
import api from "../../../config/axios";
import ModalAlert from "../modal-alert";
import LeaderRoute from "../../../utils/leader-route";
import ModalEditTask from "../modal-edit-task";

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
    picture: string;
    RollNumber: string;
    FullName: string;
}

type ModalEditFeatureProps = {
    isVisible: boolean;
    onClose: () => void;
    feature: Feature | undefined;
};

const ModalEditFeature: FC<ModalEditFeatureProps> = ({ isVisible, onClose, feature }) => {
    if (feature) {
        const [inputDescription, setInputDescription] = useState("");
        const [inputName, setInputName] = useState("");
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [showAlertModal, setShowAlertModal] = useState(false);
        const [showEditTaskModal, setShowEditTaskModal] = useState(false);
        const [tempTask, setTempTask] = useState<Tasks | undefined>();

        const [inputNameError, setInputNameError] = useState("");
        const [inputDescriptionError, setInputDescriptionError] = useState("");

        const toast = useContext(ToastContext);

        const member = !JSON.parse(sessionStorage.getItem("userSession")!).userInfo.leader;

        let progressRate;
        if (feature!.taskList.length === 0) {
            progressRate = 100;
        } else {
            progressRate = (feature!.taskList.filter(task => task.status === "Done").length / feature!.taskList.length) * 100;
        }

        let color;
        if (progressRate >= 0 && progressRate < 30) {
            color = "red";
        } else if (progressRate >= 30 && progressRate < 60) {
            color = "yellow";
        } else {
            color = "green";
        }

        useEffect(() => {
            if (feature) {
                setInputName(feature.name);
                setInputDescription(feature.description);
                setStartDate(new Date(feature.startDate));
                setEndDate(new Date(feature.endDate));
            }
        }, [feature]);

        useEffect(() => {
            if (endDate < startDate) {
                setStartDate(new Date(feature.startDate));
                setEndDate(new Date(feature.endDate));
                toast?.setErrorMessage("End date cannot be earlier than the start date.");
            }
        }, [startDate, endDate]);

        const handleDelete = () => {
            try {
                const fetchUserData = async () => {
                    const response = await api.delete(`/api/v1/student/delete-feature/${feature.id}`);
                    if (response.status === 204) {
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

        const handleUpdate = () => {
            let valid = true;
            if (inputName.length < 5 || inputName.length > 200) {
                setInputNameError("Name must be from 5 to 200 characters.");
                valid = false;
            } else {
                setInputNameError("");
            }

            if (inputDescription.length < 5) {
                setInputDescriptionError("Description must be from 5 characters.");
                valid = false;
            } else {
                setInputDescriptionError("");
            }

            if (valid === true) {
                try {
                    const request = {
                        name: inputName,
                        description: inputDescription,
                        status: false,
                        startDate: startDate,
                        endDate: endDate
                    }
                    const fetchUserData = async () => {
                        const response = await api.put(`/api/v1/student/update-feature/${feature.id}`, request, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        });
                        console.log(response);

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
        }

        if (!isVisible) {
            return null;
        } else {
            return (
                <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full flex justify-end overflow-auto">
                    <div className="bg-white w-96 p-5 border-l border-gray-200 flex flex-col gap-y-5 overflow-y-auto shadow-sm animate-modalenterleft">
                        <div className="flex items-center justify-between">
                            {member ?
                                <div className="text-2xl font-bold">Feature details</div> :
                                <div className="text-2xl font-bold">Edit feature</div>
                            }

                            <button onClick={() => {
                                onClose();
                                setInputNameError("");
                                setInputDescriptionError("");
                            }}>
                                <XButton />
                            </button>
                        </div>

                        <div className="w-full">
                            <InputText title="Feature name" placeholder="" value={inputName} readonly={member} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                        </div>

                        <div className="flex gap-5">
                            <div className="w-full">
                                <InputDate value={startDate} title="Start date" readonly={member} onChange={(e) => setStartDate(e)} />
                            </div>

                            <div className="w-full">
                                <InputDate value={endDate} title="End date" readonly={member} onChange={(e) => setEndDate(e)} />
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex flex-col gap-y-2">
                                <div className="text-sm font-semibold">Description</div>
                                <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600" readOnly={member}
                                    minRows={5} maxRows={10} value={inputDescription} onChange={(e) => { setInputDescription(e.target.value) }} />
                                {inputDescriptionError !== "" ? <div className="text-xs text-red-600">{inputDescriptionError}</div> : null}
                            </div>
                        </div>

                        <LeaderRoute>
                            <div className="flex gap-2 justify-end">
                                <button onClick={() => setShowAlertModal(true)}>
                                    <RejectButton icon="" message="Delete" />
                                </button>

                                <button onClick={handleUpdate}>
                                    <ApproveButton icon="" message="Save" />
                                </button>
                            </div>
                        </LeaderRoute>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit text-xs">
                            <div className="text-gray-600 text-end">Done tasks: {feature!.taskList.filter(task => task.status === "Done").length}/{feature!.taskList.length}</div>
                            <div className={`w-full h-1.5 bg-${color}-50`}>
                                <div className={`h-full bg-${color}-600`} style={{ width: `${progressRate}%` }}></div>
                            </div>
                            {feature.taskList.map((taskItem) => (
                                <div onClick={() => {
                                    setTempTask(taskItem);
                                    setShowEditTaskModal(true);
                                }}>
                                    <TaskItemSubBox
                                        picture={taskItem.student.picture}
                                        name={taskItem.name}
                                        status={taskItem.status} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <ModalAlert
                        isVisible={showAlertModal}
                        onClose={() => setShowAlertModal(false)} type={"warning"}
                        title="Warning"
                        description="Are you sure you want to delete this feature?"
                        button={
                            <button onClick={handleDelete}>
                                <RejectButton icon="" message="Delete" />
                            </button>
                        } />

                    <ModalEditTask
                        isVisible={showEditTaskModal}
                        onClose={() => setShowEditTaskModal(false)} 
                        task={tempTask} 
                        feature={feature}/>
                </div>
            )
        }
    }
}

export default ModalEditFeature;