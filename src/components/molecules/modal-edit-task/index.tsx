import { FC, useContext, useEffect, useState } from "react";
import ApproveButton from "../../atoms/approve-button";
import InputText from "../../atoms/input-text";
import InputSelect from "../../atoms/input-select";
import TextareaAutosize from 'react-textarea-autosize';
import XButton from "../../atoms/x-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";
import ModalAlert from "../modal-alert";
import RejectButton from "../../atoms/reject-button";

type ModalEditTaskProps = {
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
}

type Student = {
    RollNumber: string;
    FullName: string;
}

type StudentFormatted = {
    id: string;
    name: string;
}

const ModalEditTask: FC<ModalEditTaskProps> = ({ isVisible, onClose, task, feature }) => {
    const [inputName, setInputName] = useState("");
    const [inputFeature, setInputFeature] = useState("");
    const [inputPriority, setInputPriority] = useState("");
    const [inputMember, setInputMember] = useState("");
    const [inputStatus, setInputStatus] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [showAlertModel, setShowAlertModel] = useState(false);

    const [studentList, setStudentList] = useState<Student[]>([]);
    const [studentListFormatted, setStudentListFormatted] = useState<StudentFormatted[]>([]);
    const [featureList, setFeatureList] = useState<Feature[]>([]);

    const [inputNameError, setInputNameError] = useState("");
    const [inputFeatureError, setInputFeatureError] = useState("");
    const [inputDescriptionError, setInputDescriptionError] = useState("");

    const priorityList = [
        { id: "Low", name: "Low" },
        { id: "Medium", name: "Medium" },
        { id: "High", name: "High" }
    ];

    const statusList = [
        { id: "To do", name: "To do" },
        { id: "In progress", name: "In progress" },
        { id: "Verifying", name: "Verifying" },
        { id: "Done", name: "Done" }
    ];

    const toast = useContext(ToastContext);

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const response = await api.get("/api/v1/student/view-feature-member-list");
                setStudentList(response.data.groupMembers);
                setFeatureList(response.data.groupFeatures);
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        let formattedStudents: StudentFormatted[] = studentList.map(student => ({
            id: student.RollNumber,
            name: student.FullName,
        }));

        setStudentListFormatted(formattedStudents);
    }, [studentList]);

    useEffect(() => {
        if (task) {
            setInputName(task.name);
            if (feature) {
                setInputFeature(feature!.id);
            }
            setInputPriority(task.priority);
            setInputMember(task.student.RollNumber);
            setInputDescription(task.description);
            setInputStatus(task.status);
        }
    }, [task])

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

        if (inputFeature === "") {
            setInputFeatureError("Please select a feature.");
            valid = false;
        } else {
            setInputFeatureError("");
        }

        if (valid === true) {
            try {
                const request = {
                    id: task?.id,
                    name: inputName,
                    description: inputDescription,
                    status: inputStatus,
                    priority: inputPriority,
                    taskIndex: task!.taskIndex
                }
                const fetchUserData = async () => {
                    const response = await api.put(`/api/v1/student/update-task/${inputMember.trim()}/${inputFeature}`, request, {
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

    const handleDelete = () => {
        try {
            const fetchUserData = async () => {
                const response = await api.delete(`/api/v1/student/delete-task/${task!.id}/${inputMember}/${inputFeature === "" ? 0 : inputFeature}`);
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

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center shadow">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Edit task</div>
                        <button onClick={() => {
                            onClose();
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Task name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Feature" data={JSON.stringify(featureList)} onChange={(e) => setInputFeature(e.target.value)} value={inputFeature} error={inputFeatureError} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Priority" data={JSON.stringify(priorityList)} onChange={(e) => setInputPriority(e.target.value)} value={inputPriority} error="" />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Status" data={JSON.stringify(statusList)} onChange={(e) => setInputStatus(e.target.value)} value={inputStatus} error="" />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Assign to" data={JSON.stringify(studentListFormatted)} onChange={(e) => setInputMember(e.target.value)} value={inputMember} error="" />
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-sm">Description</div>
                            <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600"
                                minRows={5} maxRows={10} value={inputDescription} onChange={(e) => { setInputDescription(e.target.value) }} />
                            {inputDescriptionError !== "" ? <div className="text-xs text-red-600">{inputDescriptionError}</div> : null}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => setShowAlertModel(true)}>
                            <RejectButton icon="" message="Delete" />
                        </button>

                        <button onClick={handleUpdate}>
                            <ApproveButton icon="" message="Update" />
                        </button>
                    </div>
                </div>
                <ModalAlert
                    isVisible={showAlertModel}
                    onClose={() => setShowAlertModel(false)} type={"warning"}
                    title="Warning"
                    description="Are you sure you want to delete this feature?"
                    button={
                        <button onClick={handleDelete}>
                            <RejectButton icon="" message="Delete" />
                        </button>
                    } />
            </div>
        )
    }
}

export default ModalEditTask;