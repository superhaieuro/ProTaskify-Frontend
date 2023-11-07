import { FC, useContext, useEffect, useState } from "react";
import NormalButton from "../../atoms/normal-button";
import ApproveButton from "../../atoms/approve-button";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import InputSelect from "../../atoms/input-select";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

type ModalGroupSettingProps = {
    isVisible: boolean;
    onClose: () => void;
    name: string;
    studentList: Student[];
};

type Student = {
    RollNumber: string;
    FullName: string;
    leader: boolean;
}

type StudentFormatted = {
    id: string;
    name: string;
    leader: boolean;
}

const ModalGroupSetting: FC<ModalGroupSettingProps> = ({ isVisible, onClose, name, studentList }) => {
    const [inputName, setInputName] = useState("");
    const [inputMember, setInputMember] = useState("");
    const [studentListFormatted, setStudentListFormatted] = useState<StudentFormatted[]>([]);

    const [inputNameError, setInputNameError] = useState("");

    const toast = useContext(ToastContext);

    useEffect(() => {
        let formattedStudents: StudentFormatted[] = studentList.map(student => ({
            id: student.RollNumber,
            name: student.FullName,
            leader: student.leader
        }));
        setInputName(name);
        setInputMember(studentList.find(student => student.leader)!.RollNumber);
        setStudentListFormatted(formattedStudents);
    }, [studentList]);

    const handleUpdate = () => {
        let valid = true;
        if (inputName.length < 5 || inputName.length > 50) {
            setInputNameError("Name must be from 5 to 50 characters.");
            valid = false;
        } else {
            setInputNameError("");
        }

        if (valid === true) {
            try {
                const fetchUserData = async () => {
                    const userInfo = JSON.parse(sessionStorage.getItem("userSession")!);
                    const response = await api.put(`/api/v1/student/update-group-info/${userInfo.userInfo.RollNumber}/${inputMember}/${inputName}`, {
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
            flex justify-center items-center">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Group setting</div>
                        <button onClick={() => {
                            onClose();
                            setInputNameError("");
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Group name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Leader" value={inputMember} data={JSON.stringify(studentListFormatted)} onChange={(e) => setInputMember(e.target.value)} error="" readonly={false} />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputNameError("");
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleUpdate}>
                            <ApproveButton icon="" message="Update" />
                        </button>
                    </div>
                </div>
            </div >
        )
    }
}

export default ModalGroupSetting;