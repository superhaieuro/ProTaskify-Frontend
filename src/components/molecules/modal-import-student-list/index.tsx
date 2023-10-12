import { FC, useContext } from "react";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

type Student = {
    RollNumber: string;
    MemberCode: string;
    FullName: string;
};

type ModalImportStudentListProps = {
    isVisible: boolean;
    onClose: () => void;
    className: string;
    semeter: string;
    data: string;
};

const ModalImportStudentList: FC<ModalImportStudentListProps> = ({
    isVisible,
    onClose,
    className,
    semeter, 
    data,
}) => {
    const toast = useContext(ToastContext);

    const handleCreate = () => {
        try {
            const request = {
                students: JSON.parse(data), //Student list
                className: className, //Class Name
                lecturerEmail: JSON.parse(sessionStorage.getItem("userSession")!).userInfo.MemberCode //Lecturer email
            }
            
            const fetchUserData = async () => {
                const response = await api.post("/api/v1/lecturer/import-student", request, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
                if (response.status === 200) {
                    toast?.setSuccessMessage("Create class successfully.");
                    onClose();
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
        const jsonData: Student[] = JSON.parse(data);

        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center shadow">
                <div className="bg-white p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">New class</div>
                        <button onClick={() => onClose()}>
                            <XButton />
                        </button>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-full">
                            <InputText title="Class" placeholder="" value={className} readonly={true} onChange={() => null} />
                        </div>
                        <div className="w-full">
                            <InputText title="Semester" placeholder="" value={JSON.parse(semeter).name} readonly={true} onChange={() => null}/>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <div>Student list</div>
                        <div className="border border-gray-200 rounded-lg overflow-auto">
                            <div className="p-5 bg-gray-50 flex gap-x-2 border-b border-gray-200">
                                <div className="w-10">#</div>
                                <div className="w-28">Roll Number</div>
                                <div className="w-52">Member Code</div>
                                <div className="w-52">Full Name</div>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {jsonData.map((student, index) => (
                                    <div key={index} className="p-5 flex gap-x-2">
                                        <div className="w-10">{index + 1}</div>
                                        <div className="w-28">{student.RollNumber}</div>
                                        <div className="w-52">{student.MemberCode}</div>
                                        <div className="w-52">{student.FullName}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
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

export default ModalImportStudentList;
