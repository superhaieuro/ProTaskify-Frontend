import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import TextareaAutosize from 'react-textarea-autosize';
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import InputText from "../../atoms/input-text";
import InputDate from "../../atoms/input-date";
import { ToastContext } from "../../../utils/toast-context";
import api from "../../../config/axios";
import InputSelect from "../../atoms/input-select";

type ModalEditLecturerProps = {
    isVisible: boolean;
    onClose: () => void;
    lecturer: Lecturer;
};

type Lecturer = {
    RollNumber: string;
    FullName: string;
    picture: string;
    MemberCode: string;
    status: boolean;
}

const statusList = [
    { id: "true", name: "On" },
    { id: "false", name: "Off" }
];

const ModalEditLecturer: FC<ModalEditLecturerProps> = ({ isVisible, onClose, lecturer }) => {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputStatus, setInputStatus] = useState("");

    const [inputNameError, setInputNameError] = useState("");
    const [inputEmailError, setInputEmailError] = useState("");

    const toast = useContext(ToastContext);

    useEffect(() => {
        setInputName(lecturer.FullName);
        setInputEmail(lecturer.MemberCode);
        setInputStatus(JSON.stringify(lecturer.status));
    }, [])

    const handleCreate = () => {
        let valid = true;
        if (inputName.length < 5 || inputName.length > 50) {
            setInputNameError("Name must be from 5 to 50 characters.");
            valid = false;
        } else {
            setInputNameError("");
        }

        if (inputEmail.length < 5 || inputEmail.length > 50) {
            setInputEmailError("Email must be from 5 to 50 characters.");
            valid = false;
        } else {
            setInputEmailError("");
        }

        if (valid === true) {
            try {
                const request = {
                    FullName: inputName,
                    MemberCode: inputEmail,
                    status: inputStatus,
                }
                const fetchUserData = async () => {
                    const response = await api.put(`/api/v1/admin/update-lecturer/${lecturer.RollNumber}`, request, {
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
                        <div className="text-2xl font-bold">Edit lecturer</div>
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputNameError("");
                            setInputEmail("");
                            setInputEmailError("");
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="w-full">
                        <InputText title="Email" placeholder="" value={inputEmail} readonly={false} onChange={(e) => setInputEmail(e.target.value)} error={inputEmailError} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Status" data={JSON.stringify(statusList)} onChange={(e) => setInputStatus(e.target.value)} value={inputStatus} error="" readonly={false} />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputNameError("");
                            setInputEmail("");
                            setInputEmailError("");
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate}>
                            <ApproveButton icon="" message="Save" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalEditLecturer;