import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import StatusBox from "../../atoms/status-box";
import TextareaAutosize from 'react-textarea-autosize';
import RejectButton from "../../atoms/reject-button";
import ApproveButton from "../../atoms/approve-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

type ModalVerifyTaskProps = {
    isVisible: boolean;
    onClose: () => void;
    task: Tasks | undefined;
    feature: Feature | undefined;
};

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

type Feature = {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

type Student = {
    RollNumber: string;
    FullName: string;
}

const ModalVerifyTask: FC<ModalVerifyTaskProps> = ({ isVisible, onClose, task, feature }) => {
    const [inputFeedback, setInputFeedback] = useState<string | null>(null);
    const [inputFeedbackError, setInputFeedbackError] = useState("");

    const toast = useContext(ToastContext);

    let color;

    if (task?.priority) {
        if (task?.priority === "High") {
            color = "red";
        } else if (task!.priority === "Medium") {
            color = "yellow";
        } else {
            color = "green";
        }
    }

    useEffect(() => {
        if (task?.feedback) {
            setInputFeedback(task.feedback);
        }
    }, [task]);

    const handleUpdate = (status: string) => {
        let valid = true;

        if (inputFeedback && status !== "Done") {
            if (inputFeedback.length < 5) {
                setInputFeedbackError("Description must be from 5 characters.");
                valid = false;
            }
        } else {
            setInputFeedbackError("");
        }

        if (valid === true) {
            try {
                const request = {
                    id: task?.id,
                    name: task?.name,
                    description: task?.description,
                    status: status,
                    priority: task?.priority,
                    taskIndex: task!.taskIndex,
                    feedback: inputFeedback
                }
                const fetchUserData = async () => {
                    const response = await api.put(`/api/v1/student/update-task/${task?.student.RollNumber.trim()}/${feature ? feature.id : "0"}`, request, {
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
    }

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center shadow-sm">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Task information</div>
                        <button onClick={() => {
                            onClose();
                            setInputFeedbackError("");
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <StatusBox color={color!} message={task!.priority} />

                    {feature ?
                        <>
                            <div>
                                <div className="text-sm font-semibold">Feature</div>
                                <div className="text-sm text-gray-600">{feature?.name}</div>
                            </div>

                            <div>
                                <div className="text-sm font-semibold">Due date</div>
                                <div className="text-sm text-gray-600">
                                    {new Date(feature!.startDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                    {" - "}
                                    {new Date(feature!.endDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </div>
                            </div>
                        </> : null}

                    <div>
                        <div className="text-sm font-semibold">Assign to</div>
                        <div className="text-sm text-gray-600">{task?.student.FullName}</div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold">Description</div>
                        <div className="text-sm text-gray-600 whitespace-pre-wrap">{task?.description}</div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-sm font-semibold">Feedback</div>
                            <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600"
                                minRows={5} maxRows={10} value={inputFeedback ?? ""} onChange={(e) => { setInputFeedback(e.target.value) }} placeholder="Required if task is rejected" />
                            {inputFeedbackError !== "" ? <div className="text-xs text-red-600">{inputFeedbackError}</div> : null}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            handleUpdate("To do");
                        }}>
                            <RejectButton icon="" message="Rejected" />
                        </button>

                        <button onClick={() => {
                            handleUpdate("Done");
                        }}>
                            <ApproveButton icon="" message="Approve" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalVerifyTask;