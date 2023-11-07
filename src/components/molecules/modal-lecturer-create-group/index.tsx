import { FC, useContext, useState } from "react";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

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
    score: string;
    studentList: Student[];
}

type Class = {
    id: number;
    name: string;
    studentList: Student[];
    groupList: Group[];
};

type ModalLecturerCreateGroupProps = {
    isVisible: boolean;
    onClose: () => void;
    classes: Class;
};

const ModalLecturerCreateGroup: FC<ModalLecturerCreateGroupProps> = ({ isVisible, onClose, classes }) => {
    const [inputName, setInputName] = useState("");
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const [inputNameError, setInputNameError] = useState("");
    const [selectedStudentsError, setSelectedStudentsError] = useState("");
    const toast = useContext(ToastContext);

    const handleCreate = () => {
        let valid = true;
        if (inputName.length < 5 || inputName.length > 50) {
            setInputNameError("Name must be from 5 to 50 characters.");
            valid = false;
        } else {
            setInputNameError("");
        }

        if (selectedStudents.length < 4 || selectedStudents.length > 6) {
            setSelectedStudentsError("Group must contains 4 to 6 members.");
            valid = false;
        } else {
            setSelectedStudentsError("");
        }

        if (valid === true) {
            try {
                const fetchUserData = async () => {
                    const response = await api.post(`/api/v1/lecturer/create-group?classId=${classes.id}&groupName=${inputName}&studentListWithOutGroup=${selectedStudents}&leaderId=${selectedStudents[0]}`, {
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

    const handleCheckboxChange = (studentId: string) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(prevState => prevState.filter(id => id !== studentId));
        } else {
            setSelectedStudents(prevState => [...prevState, studentId]);
        }
    };

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center">
                <div className="bg-white p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Create new group</div>
                        <button onClick={() => onClose()}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Group name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <div className="font-semibold">Student list</div>
                        <div className="border border-gray-200 rounded-lg overflow-auto">
                            <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                                <div className="w-10">#</div>
                                <div className="w-28">Roll Number</div>
                                {/* <div className="w-52">Email</div> */}
                                <div className="w-52">Full Name</div>
                            </div>
                            <div className="max-h-80 overflow-y-auto divide-y">
                                {classes.studentList.filter(student => classes.groupList.find(group =>
                                    group.studentList.some(st => st.RollNumber === student.RollNumber)) == null).map((student, index) => (
                                        <div key={index} className="p-5 flex gap-x-5">
                                            <div className="w-10">{index + 1}</div>
                                            <div className="w-28">{student.RollNumber}</div>
                                            {/* <div className="w-52">{student.MemberCode}</div> */}
                                            <div className="w-52">{student.FullName}</div>
                                            <input
                                                type="checkbox"
                                                id={student.RollNumber}
                                                value={student.RollNumber}
                                                checked={selectedStudents.includes(student.RollNumber)}
                                                onChange={() => handleCheckboxChange(student.RollNumber)}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {selectedStudentsError !== "" ? <div className="text-xs text-red-600">{selectedStudentsError}</div> : null}
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => onClose()}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate}>
                            <ApproveButton icon="" message="Create" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalLecturerCreateGroup;