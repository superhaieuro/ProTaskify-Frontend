import { FC, useContext, useEffect, useState } from "react";
import InputText from "../../atoms/input-text";
import XButton from "../../atoms/x-button";
import NormalButton from "../../atoms/normal-button";
import ApproveButton from "../../atoms/approve-button";
import TextareaAutosize from 'react-textarea-autosize';
import InputSelect from "../../atoms/input-select";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

type ModalCreateNewTaskProps = {
    isVisible: boolean;
    onClose: () => void;
};

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

const ModalCreateNewTask: FC<ModalCreateNewTaskProps> = ({ isVisible, onClose }) => {
    const [inputName, setInputName] = useState("");
    const [inputFeature, setInputFeature] = useState("");
    const [inputPriority, setInputPriority] = useState("");
    const [inputMember, setInputMember] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    const [studentList, setStudentList] = useState<Student[]>([]);
    const [studentListFormatted, setStudentListFormatted] = useState<StudentFormatted[]>([]);
    const [featureList, setFeatureList] = useState<Feature[]>([]);

    const [inputNameError, setInputNameError] = useState("");
    const [inputFeatureError, setInputFeatureError] = useState("");
    const [inputPriorityError, setInputPriorityError] = useState("");
    const [inputMemberError, setInputMemberError] = useState("");
    const [inputDescriptionError, setInputDescriptionError] = useState("");

    const priorityList = [
        { id: "Low", name: "Low" },
        { id: "Medium", name: "Medium" },
        { id: "High", name: "High" }
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

    const handleCreate = () => {
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

        if (inputPriority === "") {
            setInputPriorityError("Please select a priority.");
            valid = false;
        } else {
            setInputPriorityError("");
        }

        if (inputMember === "") {
            setInputMemberError("Please select a member.");
            valid = false;
        } else {
            setInputMemberError("");
        }

        if (valid === true) {
            try {
                const request = {
                    name: inputName,
                    status: "To do",
                    description: inputDescription,
                    priority: inputPriority,
                    createDate: new Date(),
                }
                const fetchUserData = async () => {
                    const response = await api.post(`/api/v1/student/create-task/${inputMember}/${inputFeature}`, request, {
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
            flex justify-center items-center shadow-sm animate-modalenter">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">New task</div>
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputFeature("");
                            setInputPriority("");
                            setInputMember("");
                            setInputDescription("");

                            setInputNameError("");
                            // setInputFeatureError("");
                            setInputPriorityError("");
                            setInputMemberError("");
                            setInputDescriptionError("");
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Task name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Feature" data={JSON.stringify([{ id: "0", name: "No feature" }, ...featureList])} onChange={(e) => setInputFeature(e.target.value)} value={""} error={inputFeatureError} readonly={false} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Priority" data={JSON.stringify(priorityList)} onChange={(e) => setInputPriority(e.target.value)} value={""} error={inputPriorityError} readonly={false} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Assign to" data={JSON.stringify(studentListFormatted)} onChange={(e) => setInputMember(e.target.value)} value={""} error={inputMemberError} readonly={false} />
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-sm font-semibold">Description</div>
                            <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600"
                                minRows={5} maxRows={10} value={inputDescription} onChange={(e) => { setInputDescription(e.target.value) }} />
                            {inputDescriptionError !== "" ? <div className="text-xs text-red-600">{inputDescriptionError}</div> : null}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputFeature("");
                            setInputPriority("");
                            setInputMember("");
                            setInputDescription("");

                            setInputNameError("");
                            // setInputFeatureError("");
                            setInputPriorityError("");
                            setInputMemberError("");
                            setInputDescriptionError("");
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate}>
                            <ApproveButton icon="" message="Create" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalCreateNewTask;