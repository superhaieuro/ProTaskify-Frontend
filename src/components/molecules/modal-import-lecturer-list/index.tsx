import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

type Lecturer = {
    RollNumber: string;
    MemberCode: string;
    FullName: string;
};

type ModalImportLecturerListProps = {
    isVisible: boolean;
    onClose: () => void;
    data: string;
};

const ModalImportLecturerList: FC<ModalImportLecturerListProps> = ({
    isVisible,
    onClose,
    data,
}) => {
    const toast = useContext(ToastContext);
    const [loading, setLoading] = useState(false);

    const handleCreate = () => {
        setLoading(true);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const request = {
                    lecturers: JSON.parse(data)
                }
                const response = await api.post(
                    "/api/v1/admin/import-lecturers",
                    request,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                if (response.status === 200) {
                    // toast?.setSuccessMessage("Import successfully.");
                    window.location.reload();
                    onClose();
                } else {
                    toast?.setErrorMessage("Failed to send data.");
                }
            } catch (error) {
                console.log(error);
                toast?.setErrorMessage("An error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            fetchUserData();
        }
    }, [loading]);

    if (!isVisible) {
        return null;
    } else {
        const jsonData: Lecturer[] = JSON.parse(data);

        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center">
                <div className="bg-white p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Import lecturers</div>
                        <button onClick={() => onClose()}>
                            <XButton />
                        </button>
                    </div>

                    {/* <div className="flex gap-5">
                        <div className="w-full">
                            <InputText title="Semester" placeholder="" value="Fall 2023" readonly={true} onChange={() => null} error={""} />
                        </div>
                    </div> */}

                    <div className="flex flex-col gap-2 text-sm">
                        <div>Lecturer list</div>
                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-5 bg-gray-50 flex gap-x-5 rounded-t-lg border-b border-gray-200">
                                <div className="w-10">#</div>
                                <div className="w-28">Roll Number</div>
                                <div className="w-52">Member Code</div>
                                <div className="w-52">Full Name</div>
                            </div>
                            <div className="max-h-96 overflow-y-auto divide-y">
                                {jsonData.map((lecturer, index) => (
                                    <div key={index} className="p-5 flex gap-x-5">
                                        <div className="w-10">{index + 1}</div>
                                        <div className="w-28">{lecturer.RollNumber}</div>
                                        <div className="w-52">{lecturer.MemberCode}</div>
                                        <div className="w-52">{lecturer.FullName}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => onClose()}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate} disabled={loading}>
                            <ApproveButton icon="" message="Create" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalImportLecturerList;
